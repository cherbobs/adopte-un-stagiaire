COPY secteur(id, secteur)
FROM
    '/tmp/csv/secteurs.csv' WITH DELIMITER '|' CSV HEADER;

COPY commune(
    id,
    code_commune_INSEE,
    nom_commune_postal,
    code_postal,
    libelle_acheminement,
    lat_long,
    code_commune,
    article,
    nom_commune,
    nom_commune_complet,
    code_departement,
    nom_departement,
    code_region,
    nom_region
)
FROM
    '/tmp/csv/communes.csv' WITH DELIMITER '|' CSV HEADER;

COPY metier(id, metier, secteur_id)
FROM
    '/tmp/csv/metiers.csv' WITH DELIMITER '|' CSV HEADER;

COPY candidat(
    id,
    nom,
    prenom,
    email,
    telephone,
    pays,
    date_naissance
)
FROM
    '/tmp/csv/candidats.csv' WITH DELIMITER '|' CSV HEADER;

COPY offre(
    id,
    secteur_id,
    metier_id,
    titre_emploi,
    entreprise,
    lieu,
    description_courte,
    contrat,
    type_contrat,
    description,
    commune_id
)
FROM
    '/tmp/csv/offres.csv' WITH DELIMITER '|' CSV HEADER;

COPY candidat_communes(candidat_id, commune_id)
FROM
    '/tmp/csv/candidats_communes.csv' WITH DELIMITER '|' CSV HEADER;

COPY candidat_offres(candidat_id, offre_id)
FROM
    '/tmp/csv/candidats_offres.csv' WITH DELIMITER '|' CSV HEADER;

COPY candidat_secteurs(candidat_id, secteur_id)
FROM
    '/tmp/csv/candidats_secteurs.csv' WITH DELIMITER '|' CSV HEADER;

COPY date_debut_stage(offre_id, debut_stage, mois_de_stage)
FROM
    '/tmp/csv/dates_debut_stage.csv' WITH DELIMITER '|' CSV HEADER;