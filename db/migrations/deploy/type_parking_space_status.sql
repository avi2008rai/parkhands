-- Deploy PH:type_parking_space_status to pg

SET client_min_messages TO WARNING;

ALTER TYPE public.parking_space_status ADD VALUE IF NOT EXISTS 'unlisted';
ALTER TYPE public.parking_space_status ADD VALUE IF NOT EXISTS 'deleted';

RESET client_min_messages;
