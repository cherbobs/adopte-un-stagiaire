import { useAuth0 } from "@auth0/auth0-react";
import { Box, TextField, Button, Avatar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { authenticatedGet, authenticatedPost } from "../auth/helper";

export function Parametres() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [profile, setProfile] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pays, setPays] = useState("");
  const [telephone, setTelephone] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      // setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const profileData = await authenticatedGet(token, `/v1/parametres`);
        setProfile(profileData);
        setNom(profileData?.nom || "");
        setPrenom(profileData?.prenom || "");
        setPays(profileData?.pays || "");
        setTelephone(profileData?.telephone || "");
        setPhoto(profileData?.photo || "");
      } catch (error) {
        setError(`Erreur du service web : ${error}`);
      } finally {
        // setLoading(false);
      }
    }
    fetchProfile();
  }, [getAccessTokenSilently, user?.sub]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const updatedProfile = {
        id: user?.sub,
        nom: nom || profile?.nom || "",
        prenom: prenom || profile?.prenom || "",
        pays: pays || profile?.pays || "",
        telephone: telephone || profile?.telephone || "",
        photo: photo || profile?.photo || ""
      };
      console.log("Submitting profile:", updatedProfile);

      const response = await authenticatedPost(token, `v1/parametres`, updatedProfile)
      console.log(response)
      
    } catch (error: any) {
      setError(`Erreur du service web : ${error.message}`);
    } finally {
      // setLoading(false);
    }
  };

  // if (loading) {
  //   return <div>Chargement...</div>;
  // }
   
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {error ? (
        <div>Paramètres : réponse de l'API (avec authentification) {error}</div>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar src={photo || ""} sx={{ width: 100, height: 100, marginBottom: 2 }} />
            <Button variant="contained" component="label">
              Télécharger Photo
              <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
            </Button>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-start" ml="30px" mt="20px">
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Nom
              </Typography>
              <TextField
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                variant="outlined"
                sx={{
                  width: '480px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                    border: '1px solid #FD941F',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  }
                }}
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Prénom
              </Typography>
              <TextField
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                variant="outlined"
                sx={{
                  width: '480px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                    border: '1px solid #FD941F',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  }
                }}
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Pays
              </Typography>
              <TextField
                value={pays}
                onChange={(e) => setPays(e.target.value)}
                variant="outlined"
                sx={{
                  width: '480px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                    border: '1px solid #FD941F',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  }
                }}
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Numéro de téléphone
              </Typography>
              <TextField
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                variant="outlined"
                sx={{
                  width: '480px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                    border: '1px solid #FD941F',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  }
                }}
              />
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit">Mettre à jour</Button>
          </Box>
        </form>
      )}
    </Box>
  );
}
