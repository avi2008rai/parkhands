#!/bin/bash

echo "Starting Stripe listener"
echo

stripe -v

stripe listen --forward-to localhost:$STRIPE_WEBHOOK_PORT$STRIPE_WEBHOOK_ENDPOINT
