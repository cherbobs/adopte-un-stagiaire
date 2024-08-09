import { useAuth0 } from "@auth0/auth0-react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import { authenticatedGet } from "../auth/helper";


export function Favoris() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function callApi() {
      try {
        const token = await getAccessTokenSilently();
        const document = await authenticatedGet(token, "/v1/selections");
        setData(document);
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, []);

  return loading ? (
    <Box>chargement...</Box>
  ) : (
    <Box>
      {error ? (
        `Ma Sélection: response from API (with auth) ${error}`
      ) : (
        <List>
          {data?.map((offre: any) => (
            <ListItem key={offre.id}>
              <ListItemText primary={offre.titre_emploi} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
