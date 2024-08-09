import express, { json } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import cors from "cors";
import * as interfaces from './interface';
import { getFirstOffres, getInfosOffre, getOffresNumber, getOffresRegion, getOffresForMetier, getRegions, getMetiers, infoCandidat, updateParams } from "./database";

const port = 3000;
const app = express();

app.use(cors());
app.use(json());

// Middleware for parsing JSON bodies
app.use(express.json());

const jwtCheck = auth({
  audience: 'api.orange.aus.floless.fr',
  issuerBaseURL: 'https://orange-aus.eu.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// Enforce that all incoming requests are authenticated
app.use(jwtCheck);

app.get("/v1/offres", async (req, res) => {
  const searchTerm = req.query.search as string | undefined;
  try {
    const offres = await getFirstOffres(20, searchTerm);
    res.send(offres);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});


app.get(`/v1/detailsoffre/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const offre = await getInfosOffre(+id);
    console.log(id);
    
    res.send(offre[0]);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});

app.get("/v1/parametres", async (_, res) => {
  try {
    const infos: any[] = await infoCandidat(1);
    res.send(infos[0]);
  } catch (error: any) {
    res.status(500).send({ error: "Internal Server Error", reason: error.message });
  }
});

app.post('/v1/parametres', async (req, res) => {
  try {
    console.log("Received POST request with body:", req.body); // Debug log
    const input: interfaces.UpdateParamsInput = req.body;
    console.log("Parsed input:", input); // Debug log
    const update = await updateParams(1, input.nom, input.prenom, input.telephone, input.pays);
    res.send({});
  } catch (error: any) {
    console.error("Error in /v1/parametres:", error); // Add log to show the error
    res.status(500).send({ error: "Internal Server Error", reason: error.message });
  }
});

app.get("/v1/user-profile", (_, res) => {
  try {
    res.status(404).send({ error: "Endpoint not implemented" });
  } catch (error: any) {
    res.status(500).send({ error: "Internal Server Error", reason: error.message });
  }
});


app.get("/v1/offresnumber", async (_, res) => {
  try {
    const nombre = await getOffresNumber()
    res.send(nombre)
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});

app.get('/v1/offresregion', async (req, res) => {
  const region = req.query.region as string;
  try {
    const nombre = await getOffresRegion(region);
    res.json(nombre[0]); // Assurez-vous de renvoyer la première ligne de résultat
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});

app.get('/v1/offresForMetier', async (req, res) => {
  const metier = req.query.metier as string;
  try {
    const nombre = await getOffresForMetier(metier);
    res.json(nombre[0]); // Assurez-vous de renvoyer la première ligne de résultat
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});

app.get('/v1/regions', async (_, res) => {
  try {
    const regions = await getRegions();
    res.json(regions);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});

app.get('/v1/metiers', async (_, res) => {
  try {
    const metiers = await getMetiers();
    res.json(metiers);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", reason: error });
  }
});


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
