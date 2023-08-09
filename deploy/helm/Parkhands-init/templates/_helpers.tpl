{{/*
Expand the name of the chart.
*/}}
{{- define "Parkhands-init.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "Parkhands-init.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "Parkhands-init.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "Parkhands-init.labels" -}}
helm.sh/chart: {{ include "Parkhands-init.chart" . }}
{{ include "Parkhands-init.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "Parkhands-init.selectorLabels" -}}
app.kubernetes.io/name: {{ include "Parkhands-init.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "Parkhands-init.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "Parkhands-init.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create the URLs for the different services - differntiate between 'staging' and 'production' environment (FIXME also handle other [temporary] environments)
*/}}
{{- define "Parkhands-init.configMapValues" -}}
{{ if eq .Values.migrateEnvVars.cicdNamespace "production" }}
GRAPHQL_API_URL: https://api.{{ .Values.migrateEnvVars.rootDomain }}
GRAPHQL_WS_URL: wss://api.{{ .Values.migrateEnvVars.rootDomain }}
CDN_URL: https://storage.{{ .Values.migrateEnvVars.rootDomain }}
ADMIN_URL: https://admin.{{ .Values.migrateEnvVars.rootDomain }}
CLIENT_URL: https://app.{{ .Values.migrateEnvVars.rootDomain }}
WIDGET_URL: https://widget.{{ .Values.migrateEnvVars.rootDomain }}
REST_API_URL: https://api.{{ .Values.migrateEnvVars.rootDomain }}
FILE_API_URL: https://api.{{ .Values.migrateEnvVars.rootDomain }}
{{ else }}
GRAPHQL_API_URL: https://api.{{ .Values.migrateEnvVars.cicdNamespace }}.{{ .Values.migrateEnvVars.rootDomain }}
GRAPHQL_WS_URL: wss://api.{{ .Values.migrateEnvVars.cicdNamespace }}.{{ .Values.migrateEnvVars.rootDomain }}
CDN_URL: https://storage.{{ .Values.migrateEnvVars.cicdNamespace }}.{{ .Values.migrateEnvVars.rootDomain }}
ADMIN_URL: https://admin.{{ .Values.migrateEnvVars.cicdNamespace }}.{{ .Values.migrateEnvVars.rootDomain }}
CLIENT_URL: https://app.{{ .Values.migrateEnvVars.cicdNamespace }}.{{ .Values.migrateEnvVars.rootDomain }}
WIDGET_URL: https://widget.{{ .Values.migrateEnvVars.cicdNamespace }}.{{ .Values.migrateEnvVars.rootDomain }}
REST_API_URL: https://api.{{ .Values.migrateEnvVars.cicdNamespace }}.{{ .Values.migrateEnvVars.rootDomain }}
FILE_API_URL: https://api.{{ .Values.migrateEnvVars.cicdNamespace }}.{{ .Values.migrateEnvVars.rootDomain }}
{{- end }}
{{- range $key, $value := .Values.environmentVariables }}
{{ $key }}: {{ $value | quote}}
{{- end }}
{{- end }}
