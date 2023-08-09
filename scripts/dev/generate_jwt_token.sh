#!/usr/bin/env bash

#source: https://willhaley.com/blog/generate-jwt-with-bash/

#
# JWT Encoder Bash Script
#

jq="$(which jq)"
base64="$(which base64)"
openssl="$(which openssl)"


if [[ $jq == "" || $base64 == "" || $openssl == "" ]]; then
    echo "Script generate_jwt_token requires jq, base64 and openssl to be locally installed. Aborting."
    return 1
fi

#secret='SOME SECRET'
secret="${JWT_SECRET}"

# Static header fields.
header='{
    "typ": "JWT",
    "alg": "HS256",
    "kid": "0001",
    "iss": "postgraphile"
}'

# Use jq to set the dynamic `iat` and `exp`
# fields on the header using the current time.
# `iat` is set to now, and `exp` is now + 1 second.
header=$(
    echo "${header}" | jq --arg time_str "$(date +%s)" \
    '
    ($time_str | tonumber) as $time_num
    | .iat=$time_num
    | .exp=($time_num + 3600)
    '
)

#id is from database and defaults to user super_admin@parkhands.de
payload="{
    \"id\": \"${1:-fbc0cc53-602b-4ab6-b65a-fe8e60c57a09}\",
    \"role\": \"${2:-app_super_admin}\",
    \"aud\": \"postgraphile\"
}"

base64_encode()
{
    declare input=${1:-$(</dev/stdin)}
    # Use `tr` to URL encode the output from base64.
    printf '%s' "${input}" | base64 | tr -d '=' | tr '/+' '_-' | tr -d '\n'
}

json() {
    declare input=${1:-$(</dev/stdin)}
    printf '%s' "${input}" | jq -c .
}

hmacsha256_sign()
{
    declare input=${1:-$(</dev/stdin)}
    printf '%s' "${input}" | openssl dgst -binary -sha256 -hmac "${secret}"
}

header_base64=$(echo "${header}" | json | base64_encode)
payload_base64=$(echo "${payload}" | json | base64_encode)

header_payload=$(echo "${header_base64}.${payload_base64}")
signature=$(echo "${header_payload}" | hmacsha256_sign | base64_encode)

echo "${header_payload}.${signature}"
