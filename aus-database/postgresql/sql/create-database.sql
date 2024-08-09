-- Database: aus
DROP DATABASE IF EXISTS aus;

CREATE DATABASE aus WITH OWNER = "aus-user" ENCODING = 'UTF8' TABLESPACE = pg_default LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8' CONNECTION
LIMIT
  = -1;

COMMENT ON DATABASE aus IS 'Database for the adopte un stagiaire (hackathon) for HETIC students.';