// offre.tsx

import { useAuth0 } from "@auth0/auth0-react";
import { Box, TextField, Typography, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { authenticatedGet } from "../auth/helper";
import { OffresCard } from "../Offres/OffresCard";

export function Offre() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function callApi() {
      try {
        const token = await getAccessTokenSilently();
        const endpoint = search ? `/v1/offres?search=${encodeURIComponent(search)}` : `/v1/offres`;
        const document = await authenticatedGet(token, endpoint);
        setData(document);
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, [search]);
  

  return (
    <Container>
      {loading ? (
        <Box>Chargement...</Box>
      ) : error ? (
        <Typography color="error">{`Offre: response from API (with auth) ${error}`}</Typography>
      ) : (
        <Box>
          <TextField
            label="Recherche"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box>
            {data?.map((offre: any) => (
              <OffresCard key={offre.id} offre={offre} />
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}
