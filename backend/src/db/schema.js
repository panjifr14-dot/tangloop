const { 
  pgTable, text, serial, integer, decimal, boolean, 
  timestamp, jsonb, pgEnum 
} = require("drizzle-orm/pg-core");

// ENUMS
const userRoleEnum = pgEnum("user_role", ["buyer", "supplier", "verifier", "admin"]);
const commodityCategoryEnum = pgEnum("commodity_category", ["konsumsi", "pengolahan", "pakan", "kompos"]);
const lotGradeEnum = pgEnum("lot_grade", ["A", "B", "C", "Afkir"]);
const lotStatusEnum = pgEnum("lot_status", [
  "draft", "ai_scanning", "in_verification", "published", "locked", "sold", "rejected", "expired"
]);
const orderStatusEnum = pgEnum("order_status", [
  "pending_payment", "confirmed", "driver_assigned", "picking_up", "in_transit", "delivered", "cancelled"
]);

// 1. Better Auth & User Management
const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique(),
  phone: text("phone").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: userRoleEnum("role").default("buyer").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  password: text("password")
});

const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  businessName: text("business_name").notNull(),
  marketCluster: text("market_cluster"),
  stallNumber: text("stall_number"),
  nip: text("nip"),
  address: text("address").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("5.00"),
  totalHppSaved: decimal("total_hpp_saved", { precision: 12, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// 2. Master Komoditas & Surplus Lots
const commodities = pgTable("commodities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  defaultShelfLifeHours: integer("default_shelf_life_hours").notNull(),
  idealStorageTempMin: decimal("ideal_temp_min", { precision: 4, scale: 1 }).default("3.0"),
  idealStorageTempMax: decimal("ideal_temp_max", { precision: 4, scale: 1 }).default("6.0"),
  defaultAlpha: decimal("default_alpha", { precision: 3, scale: 2 }).default("1.50").notNull(),
  imagePlaceholder: text("image_placeholder")
});

const lots = pgTable("lots", {
  id: serial("id").primaryKey(),
  supplierId: text("supplier_id").notNull().references(() => users.id),
  commodityId: integer("commodity_id").references(() => commodities.id),
  title: text("title").notNull(),
  initialWeightKg: decimal("initial_weight_kg", { precision: 8, scale: 2 }).notNull(),
  remainingWeightKg: decimal("remaining_weight_kg", { precision: 8, scale: 2 }).notNull(),
  priceMax: decimal("price_max", { precision: 10, scale: 2 }).notNull(),
  priceMin: decimal("price_min", { precision: 10, scale: 2 }).notNull(),
  currentPrice: decimal("current_price", { precision: 10, scale: 2 }).notNull(),
  decayAlpha: decimal("decay_alpha", { precision: 3, scale: 2 }).default("1.50").notNull(),
  totalShelfLifeHours: integer("total_shelf_life_hours").notNull(),
  harvestOrIntakeTime: timestamp("intake_time").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  category: commodityCategoryEnum("category").default("konsumsi").notNull(),
  grade: lotGradeEnum("grade").default("B").notNull(),
  status: lotStatusEnum("status").default("draft").notNull(),
  imageUrl: text("image_url").notNull(),
  additionalImages: jsonb("additional_images"),
  isDkpVerified: boolean("is_dkp_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// 3. AI Grading & Field Inspections
const aiGradings = pgTable("ai_gradings", {
  id: serial("id").primaryKey(),
  lotId: integer("lot_id").notNull().references(() => lots.id, { onDelete: "cascade" }),
  confidenceScore: decimal("confidence_score", { precision: 5, scale: 2 }).notNull(),
  suggestedGrade: lotGradeEnum("suggested_grade").notNull(),
  detectedDefects: jsonb("detected_defects"),
  aiReasoning: text("ai_reasoning"),
  requiresHumanReview: boolean("requires_human_review").notNull(),
  rawVisionResponse: jsonb("raw_vision_response"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

const fieldInspections = pgTable("field_inspections", {
  id: serial("id").primaryKey(),
  lotId: integer("lot_id").notNull().references(() => lots.id),
  verifierId: text("verifier_id").notNull().references(() => users.id),
  bleMeasuredWeightKg: decimal("ble_weight_kg", { precision: 8, scale: 2 }),
  bleDeviceMac: text("ble_device_mac"),
  organolepticChecklist: jsonb("organoleptic_checklist").notNull(),
  originalAiGrade: lotGradeEnum("original_ai_grade"),
  finalOverriddenGrade: lotGradeEnum("final_grade").notNull(),
  decision: text("decision").notNull(),
  officerNotes: text("officer_notes"),
  inspectedAt: timestamp("inspected_at").defaultNow().notNull()
});

// 4. Smart Locks & Valorization Routing
const smartLocks = pgTable("smart_locks", {
  id: serial("id").primaryKey(),
  lotId: integer("lot_id").notNull().references(() => lots.id),
  buyerId: text("buyer_id").notNull().references(() => users.id),
  lockedAt: timestamp("locked_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isReleased: boolean("is_released").default(false).notNull(),
  isConvertedToOrder: boolean("is_converted_to_order").default(false).notNull()
});

const valorizationRoutes = pgTable("valorization_routes", {
  id: serial("id").primaryKey(),
  lotId: integer("lot_id").notNull().references(() => lots.id),
  tier1HumanScore: decimal("tier1_score", { precision: 5, scale: 2 }),
  tier2ProcessingScore: decimal("tier2_score", { precision: 5, scale: 2 }),
  tier3FeedScore: decimal("tier3_score", { precision: 5, scale: 2 }),
  tier4CompostScore: decimal("tier4_score", { precision: 5, scale: 2 }),
  recommendedTier: integer("recommended_tier").notNull(),
  chosenTier: integer("chosen_tier").notNull(),
  appliedAt: timestamp("applied_at").defaultNow().notNull()
});

// 5. Orders & Logistics Telemetry
const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  lotId: integer("lot_id").notNull().references(() => lots.id),
  buyerId: text("buyer_id").notNull().references(() => users.id),
  supplierId: text("supplier_id").notNull().references(() => users.id),
  weightKg: decimal("weight_kg", { precision: 8, scale: 2 }).notNull(),
  pricePerKg: decimal("price_per_kg", { precision: 10, scale: 2 }).notNull(),
  commoditySubtotal: decimal("commodity_subtotal", { precision: 12, scale: 2 }).notNull(),
  logisticsFeeStandard: decimal("logistics_fee_std", { precision: 10, scale: 2 }).notNull(),
  pemkotSubsidyFee: decimal("pemkot_subsidy_fee", { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  status: orderStatusEnum("status").default("confirmed").notNull(),
  pickupSlot: text("pickup_slot").notNull(),
  pickupAddress: text("pickup_address").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  driverName: text("driver_name"),
  driverPhone: text("driver_phone"),
  vehiclePlate: text("vehicle_plate"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

const fleetTelemetry = pgTable("fleet_telemetry", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  vehiclePlate: text("vehicle_plate").notNull(),
  temperatureCelsius: decimal("temp_celsius", { precision: 4, scale: 2 }).notNull(),
  humidityRh: decimal("humidity_rh", { precision: 4, scale: 2 }),
  doorLocked: boolean("door_locked").default(true),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  recordedAt: timestamp("recorded_at").defaultNow().notNull()
});

const digitalCertificates = pgTable("digital_certificates", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id).unique(),
  certificateNumber: text("cert_number").notNull().unique(),
  sha256Hash: text("sha256_hash").notNull(),
  qrCodeData: text("qr_code_data").notNull(),
  pdfFileUrl: text("pdf_file_url"),
  issuerDepartment: text("issuer_department").default("Dinas Ketahanan Pangan Kota Tangerang"),
  verifiedInspectorName: text("verified_inspector_name").notNull(),
  issuedAt: timestamp("issued_at").defaultNow().notNull()
});

const esgMetricsDaily = pgTable("esg_metrics_daily", {
  id: serial("id").primaryKey(),
  metricDate: timestamp("metric_date").notNull().unique(),
  totalRescuedKg: decimal("total_rescued_kg", { precision: 12, scale: 2 }).notNull(),
  co2eReducedKg: decimal("co2e_reduced_kg", { precision: 12, scale: 2 }).notNull(),
  tpaDivertedPercentage: decimal("tpa_diverted_pct", { precision: 5, scale: 2 }).notNull(),
  economicValueSavedRp: decimal("economic_value_rp", { precision: 14, scale: 2 }).notNull(),
  activeUmkmCount: integer("active_umkm_count").notNull(),
  sdg2ProgressPct: decimal("sdg2_pct", { precision: 5, scale: 2 }).default("78.00"),
  sdg11ProgressPct: decimal("sdg11_pct", { precision: 5, scale: 2 }).default("65.00"),
  sdg12ProgressPct: decimal("sdg12_pct", { precision: 5, scale: 2 }).default("92.00"),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

module.exports = {
  userRoleEnum,
  commodityCategoryEnum,
  lotGradeEnum,
  lotStatusEnum,
  orderStatusEnum,
  users,
  sessions,
  accounts,
  verifications,
  userProfiles,
  commodities,
  lots,
  aiGradings,
  fieldInspections,
  smartLocks,
  valorizationRoutes,
  orders,
  fleetTelemetry,
  digitalCertificates,
  esgMetricsDaily
};

