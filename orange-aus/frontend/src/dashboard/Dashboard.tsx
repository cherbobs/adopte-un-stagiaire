import { useEffect, useState } from 'react';
import { Box, Container, Select, MenuItem, InputLabel, FormControl, Typography, styled } from '@mui/material';
import DashboardCard from './DashboardCard';
import { useAuth0 } from "@auth0/auth0-react";
import { authenticatedGet } from '../auth/helper';

const StyledContainer = styled(Container)({
  background: "linear-gradient(135deg, #f4f4f4 30%, #e8f0f2 100%)",
  minHeight: "100vh",
  paddingTop: "40px",
  paddingBottom: "40px",
  animation: "fadeIn 1s ease-in-out",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '30px',
  width: '100%',
  maxWidth: '1200px',
  padding: '0 20px',
});

const FormContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  gap: '50px',
  width: '100%',
  marginTop: '30px',
});

const FormGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  width: '100%',
  maxWidth: '400px',
  background: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s',
  "&:hover": {
    transform: 'translateY(-10px)',
  },
});

const StyledFormControl = styled(FormControl)({
  minWidth: '200px',
  "& label.Mui-focused": {
    color: "#fd941f",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fd941f",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fd941f",
    },
    "&:hover fieldset": {
      borderColor: "#e67e22",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fd941f",
    },
  },
});

const StyledDashboardCard = styled(DashboardCard)({
  background: "linear-gradient(135deg, #fd941f 30%, #e67e22 100%)",
  color: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "transform 0.3s, background 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    background: "linear-gradient(135deg, #e67e22 30%, #fd941f 100%)",
  },
});

const LoadingText = styled(Typography)({
  color: "#fd941f",
  fontSize: "24px",
  fontWeight: 500,
  animation: "blink 1s infinite",
  "@keyframes blink": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
});

const ErrorText = styled(Typography)({
  color: "red",
  fontSize: "18px",
  fontWeight: 500,
});

export function Dashboard() {
  const [offersCount, setOffersCount] = useState<number | null>(null);
  const [offersCountRegion, setOffersCountRegion] = useState<number | null>(null);
  const [offersCountMetier, setOffersCountMetier] = useState<number | null>(null);
  const [regions, setRegions] = useState<string[]>([]);
  const [metiers, setMetiers] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedMetier, setSelectedMetier] = useState<string | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getAccessTokenSilently();
        const [regionsResponse, metiersResponse] = await Promise.all([
          authenticatedGet(token, '/v1/regions'),
          authenticatedGet(token, '/v1/metiers')
        ]);

        setRegions(regionsResponse.map((region: { lieu: string }) => region.lieu));
        setMetiers(metiersResponse.map((metier: { metier: string }) => metier.metier));
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    async function callApi() {
      try {
        const token = await getAccessTokenSilently();
        const [offersResponse, regionResponse, metierResponse] = await Promise.all([
          authenticatedGet(token, '/v1/offresnumber'),
          authenticatedGet(token, selectedRegion ? `/v1/offresregion?region=${selectedRegion}` : '/v1/offresregion'),
          authenticatedGet(token, selectedMetier ? `/v1/offresformetier?metier=${selectedMetier}` : '/v1/offresformetier')
        ]);
        
        if (Array.isArray(offersResponse) && offersResponse.length > 0) {
          setOffersCount(offersResponse[0].count);
        } else {
          setOffersCount(null);
        }

        if (regionResponse.count !== undefined) {
          setOffersCountRegion(regionResponse.count);
        } else {
          setOffersCountRegion(null);
        }

        if (metierResponse.count !== undefined) {
          setOffersCountMetier(metierResponse.count);
        } else {
          setOffersCountMetier(null);
        }
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, [getAccessTokenSilently, selectedRegion, selectedMetier]);

  if (loading) {
    return (
      <StyledContainer>
        <LoadingText>Chargement...</LoadingText>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer>
        <ErrorText>{`Erreur: ${error}`}</ErrorText>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Typography variant="h3" color="primary" gutterBottom>
        Bienvenue sur Adopte Un Stagiaire !
      </Typography>
      <Typography variant="body1" gutterBottom>
        Fonctionnalités principales :
      </Typography>
      <ol>
        <li>Dashboard : Un tableau de bord interactif qui présente des statistiques intéressantes sur les offres de stage disponibles. Les utilisateurs peuvent y trouver des informations clés comme le nombre total d'offres, les offres disponibles dans leur région, et celles correspondant à des métiers spécifiques. Ce tableau de bord permet aux utilisateurs de visualiser rapidement les opportunités disponibles et de prendre des décisions éclairées.</li>
        <li>Page d'Offres : Une liste exhaustive des offres de stage accessibles sur toute la France. Les utilisateurs peuvent parcourir les offres par région ou par métier, ajouter des offres à leurs favoris pour les consulter ultérieurement, et accéder à des détails complets sur chaque offre. La fonctionnalité d'ajout en favoris permet de suivre les opportunités les plus intéressantes et de postuler facilement.</li>
      </ol>
      <StyledBox>
        <StyledDashboardCard title="Nombre d'offres" value={offersCount ?? 'Loading...'} />
        <FormContainer>
          <FormGroup>
            <StyledFormControl fullWidth>
              <InputLabel id="region-select-label">Choisir une région</InputLabel>
              <Select
                labelId="region-select-label"
                value={selectedRegion || ''}
                label="Région"
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <StyledDashboardCard title={`Offres dans la région ${selectedRegion}`} value={offersCountRegion ?? '0'} />
          </FormGroup>
          <FormGroup>
            <StyledFormControl fullWidth>
              <InputLabel id="metier-select-label">Choisir un métier</InputLabel>
              <Select
                labelId="metier-select-label"
                value={selectedMetier || ''}
                label="Métier"
                onChange={(e) => setSelectedMetier(e.target.value)}
              >
                {metiers.map((metier) => (
                  <MenuItem key={metier} value={metier}>{metier}</MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <StyledDashboardCard title={`Offres pour ${selectedMetier}`} value={offersCountMetier ?? '0'} />
          </FormGroup>
        </FormContainer>
      </StyledBox>
    </StyledContainer>
  );
}

export default Dashboard;
