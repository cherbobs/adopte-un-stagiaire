DROP TABLE IF EXISTS offre CASCADE;

DROP TABLE IF EXISTS commune CASCADE;

DROP TABLE IF EXISTS secteur CASCADE;

DROP TABLE IF EXISTS metier CASCADE;

DROP TABLE IF EXISTS candidat CASCADE;

DROP TABLE IF EXISTS candidat_communes;

DROP TABLE IF EXISTS candidat_offres;

DROP TABLE IF EXISTS candidat_secteurs;

DROP TABLE IF EXISTS date_debut_stage;

-- Exemple: 
-- id : 1001
-- code_commune_INSEE: 1001
-- nom_commune_postal: L ABERGEMENT CLEMENCIAT
-- code_postal: 1400
-- libelle_acheminement: L ABERGEMENT CLEMENCIAT
-- lat_long: POINT(46.1534255214 4.92611354223)
-- code_commune: 1
-- article: L'
-- nom_commune: Abergement-Clémenciat
-- nom_commune_complet: L'Abergement-Clémenciat
-- code_departement: 1
-- nom_departement: Ain
-- code_region: 84
-- nom_region: Auvergne-Rhône-Alpes
CREATE TABLE commune(
    id VARCHAR(32) PRIMARY KEY,
    code_commune_INSEE VARCHAR(32) NOT NULL,
    nom_commune_postal VARCHAR(255) NOT NULL,
    code_postal INTEGER NOT NULL,
    libelle_acheminement VARCHAR(255) NOT NULL,
    lat_long POINT,
    code_commune INTEGER NOT NULL,
    article VARCHAR(255),
    nom_commune VARCHAR(255) NOT NULL,
    nom_commune_complet VARCHAR(255) NOT NULL,
    code_departement VARCHAR(32) NOT NULL,
    nom_departement VARCHAR(255) NOT NULL,
    code_region INTEGER NOT NULL,
    nom_region VARCHAR(255) NOT NULL
);

CREATE TABLE secteur(
    id SERIAL PRIMARY KEY,
    secteur VARCHAR(255) NOT NULL
);

CREATE TABLE metier(
    id SERIAL PRIMARY KEY,
    secteur_id INT NOT NULL,
    metier VARCHAR(255) NOT NULL,
    FOREIGN KEY (secteur_id) REFERENCES secteur(id)
);

CREATE TABLE candidat(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    telephone VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    pays VARCHAR(255) NOT NULL,
    date_naissance DATE NOT NULL
);

CREATE TABLE offre(
    id SERIAL PRIMARY KEY,
    secteur_id INT NOT NULL,
    metier_id INT NOT NULL,
    titre_emploi VARCHAR(255) NOT NULL,
    entreprise VARCHAR(255) DEFAULT 'Non renseignée',
    lieu VARCHAR(255) NOT NULL,
    description_courte TEXT NOT NULL,
    contrat VARCHAR(255) NOT NULL,
    type_contrat VARCHAR(255) NOT NULL,
    description TEXT DEFAULT 'Pas de description',
    commune_id VARCHAR(32) NOT NULL,
    FOREIGN KEY (secteur_id) REFERENCES secteur(id),
    FOREIGN KEY (metier_id) REFERENCES metier(id),
    FOREIGN KEY (commune_id) REFERENCES commune(id)
);

CREATE TABLE candidat_communes(
    candidat_id INT NOT NULL,
    commune_id VARCHAR(32) NOT NULL,
    FOREIGN KEY (candidat_id) REFERENCES candidat(id),
    FOREIGN KEY (commune_id) REFERENCES commune(id)
);

CREATE TABLE candidat_offres(
    candidat_id INT NOT NULL,
    offre_id INT NOT NULL,
    FOREIGN KEY (candidat_id) REFERENCES candidat(id),
    FOREIGN KEY (offre_id) REFERENCES offre(id)
);

CREATE TABLE candidat_secteurs(
    candidat_id INT NOT NULL,
    secteur_id INT NOT NULL,
    FOREIGN KEY (candidat_id) REFERENCES candidat(id),
    FOREIGN KEY (secteur_id) REFERENCES secteur(id)
);

CREATE TABLE date_debut_stage(
    offre_id INT NOT NULL,
    debut_stage DATE NOT NULL,
    mois_de_stage INT NOT NULL,
    FOREIGN KEY (offre_id) REFERENCES offre(id)
);