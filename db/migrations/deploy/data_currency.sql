-- Deploy PH:data_currency to pg
-- requires table_currency

BEGIN;

INSERT INTO api.currency (id, code, name, status) VALUES ('910840eb-e522-4c83-a409-7058c039ae21', 'EUR', 'EURO', 'enabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('07ba2043-d65e-4bbe-ba07-8ec996a53396', 'CHF', 'Swiss franc', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('5d76809f-f595-4f23-9513-7889b6d89899', 'DKK', 'Danish krone', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('e23c1d27-c2ef-4112-b846-51a90342a025', 'GBP', 'Pound sterling', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('50aba76c-b5e0-47c2-b3e0-8483de98694e', 'HRK', 'Croation kuna', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('9dd3c774-cc51-47a4-8916-077a309159be', 'HUF', 'Hungarian forint', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('dd7d6a5f-03e2-44af-9814-6052b0cc582c', 'INR', 'Indian rupee', 'enabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('0063ff4c-58f3-423c-a4a9-c69c6a6bd202', 'ISK', 'Icelandic króna', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('39d9b1fa-460d-4d7a-8be7-32a3dc896ddc', 'NOK', 'Norwegian krone', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('dbde766e-f148-48bb-96fd-9dbf0f7e07d5', 'PLN', 'Polish złoty', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('7334b184-0da1-4e3b-8b18-8b00ed596c93', 'RON', 'Romanian leu', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('6919746e-765a-4a36-83da-fa1f577c861a', 'RSD', 'Serbian dinar', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('21dad6aa-84df-4891-bef6-5d7af7f629f9', 'RUB', 'Russian ruble', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('440c1358-0293-41ed-83e3-78670dab4c57', 'SEK', 'Swedish krona', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('2b6faa55-896e-4ba0-b7d5-2a317452de64', 'TRY', 'Turkish lira', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('16a61d49-4bb5-4eff-983e-c0d0a5bfdcdf', 'UAH', 'Ukrainian hryvnia', 'disabled');
INSERT INTO api.currency (id, code, name, status) VALUES ('e5a46eec-6a78-45d1-bb34-2bd99c9deb69', 'USD', 'United States dollar', 'disabled');

COMMIT;
