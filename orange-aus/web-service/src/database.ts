import pg from "pg";

const pool = new pg.Pool({
  user: process.env.RDB_USER || "aus-user",
  database: process.env.RDB_DATABASE || "aus",
  password: process.env.RDB_PASSWORD || "aus2025",
  port: +(process.env.RDB_PORT || 5433),
  host: process.env.RDB_HOST || "localhost",
});

process.on("exit", function () {
  pool.end();
});

/**
 * Sends SQL statement to the database and returns the result
 * @param sqlStatement a string containing the SQL statement
 * @returns an array of rows
 */
async function query(sqlStatement: string, params?: any[]): Promise<any[]> {
  let rows = [];
  const client = await pool.connect();
  try {
    const response = await client.query(sqlStatement, params);
    rows = response.rows;
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    client.release();
  }
  return rows;
}


export function getFirstOffres(count: number = 20, searchTerm?: string): Promise<any[]> {
  let sql = `
    SELECT
      o.id,
      o.titre_emploi,
      o.entreprise,
      o.lieu,
      o.description_courte,
      o.contrat,
      o.type_contrat,
      c.nom_commune_complet AS commune,
      s.secteur,
      m.metier
    FROM offre o
    JOIN commune c ON o.commune_id = c.id
    JOIN secteur s ON o.secteur_id = s.id
    JOIN metier m ON o.metier_id = m.id
    `;
  
  if (searchTerm) {
    sql += `WHERE o.titre_emploi ILIKE '%${searchTerm}%'`; // Adjust filtering condition as needed
  }
  
  sql += `LIMIT $1`;

  return query(sql, [count]);
}

// Update infos 
export function infoCandidat(idCandidat: number): Promise<any[]> {
  return query(`
    SELECT nom, prenom, telephone, pays FROM candidat
    WHERE id = $1`, [idCandidat]);
}

export function updateParams(id: number, nom: string, prenom: string, telephone: string, pays: string) {
  return query(`
    UPDATE candidat
    SET nom = $1, prenom = $2, telephone = $3, pays = $4
    WHERE id = $5`, [nom, prenom, telephone, pays, id]);
}

export function getOffresNumber(): Promise<any[]> {
  return query(`
  SELECT COUNT(*) 
  FROM offre
  `)
}
export async function getOffresRegion(region: string): Promise<any[]> {
  return query(`
    SELECT COUNT(*) AS count
    FROM offre
    WHERE lieu = '${region}';
  `);
}

export async function getOffresForMetier(metier: string): Promise<any[]> {
  return query(`
    SELECT COUNT(*) AS count
    FROM offre
    WHERE metier_id = (
      SELECT id
      FROM metier
      WHERE metier = '${metier}'
    );
  `);
}

// WHERE metier = '${metierName}'

export async function getRegions(): Promise<any[]> {
  return query(`
    SELECT DISTINCT lieu FROM offre;
  `);
}

export async function getMetiers(): Promise<any[]> {
  return query(`
    SELECT DISTINCT metier FROM metier;
  `);
}

export function getInfosOffre(id: number): Promise<any[]> {
  return query(`
    SELECT *
    FROM offre 
    WHERE id=${id}
  `);
}
