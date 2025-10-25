/*
  # AgriHedge Platform Database Schema

  ## Overview
  This migration creates the database schema for the Agricultural Hedging and E-Contract Platform.

  ## New Tables

  ### 1. `farmers`
  - `id` (uuid, primary key) - Unique farmer identifier
  - `phone_number` (text, unique) - Farmer's phone number for authentication
  - `name` (text) - Farmer's full name
  - `farmer_id` (text) - Human-readable farmer ID (e.g., '78543')
  - `language_preference` (text) - Preferred language (Hindi, Marathi, English)
  - `created_at` (timestamptz) - Account creation timestamp

  ### 2. `commodities`
  - `id` (uuid, primary key) - Unique commodity identifier
  - `name` (text) - Commodity name (e.g., 'Soybean')
  - `name_hindi` (text) - Commodity name in Hindi
  - `current_price` (decimal) - Current market price per quintal
  - `price_change` (decimal) - Today's price change
  - `price_change_percentage` (decimal) - Today's price change percentage
  - `updated_at` (timestamptz) - Last price update timestamp

  ### 3. `simulated_trades`
  - `id` (uuid, primary key) - Unique trade identifier
  - `farmer_id` (uuid, foreign key) - Reference to farmer
  - `commodity_id` (uuid, foreign key) - Reference to commodity
  - `position_type` (text) - 'buy' or 'sell'
  - `order_type` (text) - 'market' or 'limit'
  - `quantity` (integer) - Quantity in quintals
  - `target_price` (decimal) - Target price per quintal
  - `contract_month` (text) - Contract expiry month
  - `virtual_exposure` (decimal) - Total virtual exposure amount
  - `status` (text) - 'open', 'closed', 'expired'
  - `created_at` (timestamptz) - Trade creation timestamp

  ### 4. `e_contracts`
  - `id` (uuid, primary key) - Unique contract identifier
  - `contract_number` (text, unique) - Human-readable contract number (e.g., 'AG-84521')
  - `farmer_id` (uuid, foreign key) - Reference to farmer
  - `commodity_id` (uuid, foreign key) - Reference to commodity
  - `buyer_name` (text) - Name of the buyer
  - `agreed_price` (decimal) - Agreed price per quintal
  - `quantity` (integer) - Quantity in quintals
  - `delivery_date` (date) - Scheduled delivery date
  - `delivery_location` (text) - Delivery location
  - `quality_specs` (text) - Quality specifications
  - `payment_terms` (text) - Payment terms
  - `status` (text) - 'draft', 'pending', 'signed', 'delivery_pending', 'settled'
  - `created_at` (timestamptz) - Contract creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 5. `price_predictions`
  - `id` (uuid, primary key) - Unique prediction identifier
  - `commodity_id` (uuid, foreign key) - Reference to commodity
  - `predicted_price` (decimal) - Predicted price per quintal
  - `timeframe_days` (integer) - Prediction timeframe (30, 60, or 90 days)
  - `confidence_score` (integer) - AI confidence score (0-100)
  - `outlook` (text) - Prediction outlook description
  - `rationale` (text) - AI rationale for prediction
  - `created_at` (timestamptz) - Prediction creation timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Create policies for authenticated users to access only their own data
  - Public read access for commodities and price predictions
  - Farmers can only view and modify their own trades and contracts

  ## Notes
  - All prices are stored in INR (Indian Rupees)
  - Quantities are stored in Quintals
  - Uses UUID for primary keys for better scalability
  - Includes proper foreign key constraints for data integrity
*/

-- Create farmers table
CREATE TABLE IF NOT EXISTS farmers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text UNIQUE NOT NULL,
  name text NOT NULL,
  farmer_id text UNIQUE NOT NULL,
  language_preference text DEFAULT 'English',
  created_at timestamptz DEFAULT now()
);

-- Create commodities table
CREATE TABLE IF NOT EXISTS commodities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  name_hindi text NOT NULL,
  current_price decimal(10,2) NOT NULL,
  price_change decimal(10,2) DEFAULT 0,
  price_change_percentage decimal(5,2) DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create simulated_trades table
CREATE TABLE IF NOT EXISTS simulated_trades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
  commodity_id uuid NOT NULL REFERENCES commodities(id) ON DELETE CASCADE,
  position_type text NOT NULL CHECK (position_type IN ('buy', 'sell')),
  order_type text NOT NULL CHECK (order_type IN ('market', 'limit')),
  quantity integer NOT NULL CHECK (quantity > 0),
  target_price decimal(10,2) NOT NULL,
  contract_month text NOT NULL,
  virtual_exposure decimal(15,2) NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'closed', 'expired')),
  created_at timestamptz DEFAULT now()
);

-- Create e_contracts table
CREATE TABLE IF NOT EXISTS e_contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number text UNIQUE NOT NULL,
  farmer_id uuid NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
  commodity_id uuid NOT NULL REFERENCES commodities(id) ON DELETE CASCADE,
  buyer_name text NOT NULL,
  agreed_price decimal(10,2) NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  delivery_date date NOT NULL,
  delivery_location text NOT NULL,
  quality_specs text DEFAULT '',
  payment_terms text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'signed', 'delivery_pending', 'settled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create price_predictions table
CREATE TABLE IF NOT EXISTS price_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  commodity_id uuid NOT NULL REFERENCES commodities(id) ON DELETE CASCADE,
  predicted_price decimal(10,2) NOT NULL,
  timeframe_days integer NOT NULL CHECK (timeframe_days IN (30, 60, 90)),
  confidence_score integer NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
  outlook text NOT NULL,
  rationale text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE commodities ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulated_trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE e_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_predictions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for farmers table
CREATE POLICY "Farmers can view own profile"
  ON farmers FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Farmers can update own profile"
  ON farmers FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for commodities (public read)
CREATE POLICY "Anyone can view commodities"
  ON commodities FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for simulated_trades
CREATE POLICY "Farmers can view own trades"
  ON simulated_trades FOR SELECT
  TO authenticated
  USING (farmer_id = auth.uid());

CREATE POLICY "Farmers can create own trades"
  ON simulated_trades FOR INSERT
  TO authenticated
  WITH CHECK (farmer_id = auth.uid());

CREATE POLICY "Farmers can update own trades"
  ON simulated_trades FOR UPDATE
  TO authenticated
  USING (farmer_id = auth.uid())
  WITH CHECK (farmer_id = auth.uid());

CREATE POLICY "Farmers can delete own trades"
  ON simulated_trades FOR DELETE
  TO authenticated
  USING (farmer_id = auth.uid());

-- RLS Policies for e_contracts
CREATE POLICY "Farmers can view own contracts"
  ON e_contracts FOR SELECT
  TO authenticated
  USING (farmer_id = auth.uid());

CREATE POLICY "Farmers can create own contracts"
  ON e_contracts FOR INSERT
  TO authenticated
  WITH CHECK (farmer_id = auth.uid());

CREATE POLICY "Farmers can update own contracts"
  ON e_contracts FOR UPDATE
  TO authenticated
  USING (farmer_id = auth.uid())
  WITH CHECK (farmer_id = auth.uid());

CREATE POLICY "Farmers can delete own contracts"
  ON e_contracts FOR DELETE
  TO authenticated
  USING (farmer_id = auth.uid());

-- RLS Policies for price_predictions (public read)
CREATE POLICY "Anyone can view price predictions"
  ON price_predictions FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample commodities
INSERT INTO commodities (name, name_hindi, current_price, price_change, price_change_percentage) VALUES
  ('Soybean', 'सोयाबीन', 4520.50, 15.75, 0.35),
  ('Cotton', 'कपास', 6200.00, -25.50, -0.41),
  ('Wheat', 'गेहूं', 2150.00, 8.25, 0.38),
  ('Rice', 'चावल', 3200.00, 12.00, 0.38),
  ('Maize', 'मक्का', 1850.00, -5.50, -0.30)
ON CONFLICT (name) DO NOTHING;

-- Insert sample price predictions
DO $$
DECLARE
  soybean_id uuid;
  cotton_id uuid;
  wheat_id uuid;
BEGIN
  SELECT id INTO soybean_id FROM commodities WHERE name = 'Soybean';
  SELECT id INTO cotton_id FROM commodities WHERE name = 'Cotton';
  SELECT id INTO wheat_id FROM commodities WHERE name = 'Wheat';

  INSERT INTO price_predictions (commodity_id, predicted_price, timeframe_days, confidence_score, outlook, rationale) VALUES
    (soybean_id, 4850.75, 90, 85, 'Moderate Rise Expected', 'The forecast is based on strong monsoon predictions, increased international demand, and favorable government policies. While short-term volatility is possible, the 90-day outlook remains positive.'),
    (cotton_id, 5950.00, 90, 72, 'Slight Decline Expected', 'Global cotton surplus and decreased textile demand may put downward pressure on prices. Monitor international market trends closely.'),
    (wheat_id, 2280.00, 90, 78, 'Steady Growth Expected', 'Strong domestic consumption and government procurement programs support price stability. Weather conditions remain favorable.');
END $$;
