-- Deploy PH:table_payment_receipt to pg
-- requires: table_slot_booking

BEGIN;

  CREATE TABLE api.payment_receipt (
    id                  UUID PRIMARY KEY
                        CONSTRAINT payment_receipt_pkey
                        DEFAULT uuid_generate_v4(),
    owner_id            UUID NOT NULL
                        REFERENCES api.user
                        ON DELETE CASCADE
                        DEFAULT request.user_id(),
    payment_intent_id   TEXT NOT NULL,
    receipt_url         TEXT,
    amount              NUMERIC NOT NULL,
    created_at          TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at          TIMESTAMPTZ
  );

COMMIT;
