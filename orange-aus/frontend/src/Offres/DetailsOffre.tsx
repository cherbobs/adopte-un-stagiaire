import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, styled, Link as MuiLink } from "@mui/material";
import { useState, useEffect } from "react";
import { authenticatedGet } from "../auth/helper";

const DetailsWrapper = styled(Box)({
  alignItems: "flex-start",
  background: "linear-gradient(135deg, #f4f4f4 30%, #e8f0f2 100%)",
  display: "flex",
  minHeight: "100vh",
  position: "relative",
  padding: "90px 64px",
  transition: "background 0.3s ease",
});

const BlocDetails = styled(Box)({
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  animation: "fadeIn 1s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
});

const BlocTop = styled(Box)({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: "64px",
  justifyContent: "space-between",
  width: "100%",
  borderBottom: "2px solid #fd941f",
  paddingBottom: "16px",
  marginBottom: "16px",
});

const BlocTitle = styled(Box)({
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Title = styled(Typography)({
  color: "#fd941f",
  fontFamily: "Space Grotesk, Helvetica",
  fontSize: "36px",
  fontWeight: 700,
  letterSpacing: "1px",
  textTransform: "uppercase",
  borderBottom: "4px solid #fd941f",
  paddingBottom: "8px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#e67e22",
  },
});

const EntrepriseLieu = styled(Box)({
  alignItems: "flex-start",
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  width: "100%",
});

const ContratType = styled(Box)({
  alignItems: "flex-start",
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  width: "100%",
});

const H2 = styled(Typography)({
  color: "#000000",
  fontFamily: "Montserrat, Helvetica",
  fontSize: "20px",
  fontWeight: 600,
  borderLeft: "4px solid #fd941f",
  paddingLeft: "8px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#e67e22",
  },
});

const H3 = styled(Typography)({
  color: "#666",
  fontFamily: "Montserrat, Helvetica",
  fontSize: "18px",
  fontWeight: 500,
  borderLeft: "4px solid #fd941f",
  paddingLeft: "8px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#e67e22",
  },
});

const BlocDescription = styled(Box)({
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  position: "relative",
  backgroundColor: "#fdf1e8",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  animation: "fadeIn 1s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(10px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
});

const H4 = styled(Typography)({
  alignSelf: "stretch",
  color: "#333",
  fontFamily: "Montserrat-SemiBold, Helvetica",
  fontSize: "24px",
  fontWeight: 600,
  letterSpacing: "1px",
  textTransform: "uppercase",
  borderBottom: "2px solid #fd941f",
  paddingBottom: "4px",
});

const Description = styled(Typography)({
  alignSelf: "stretch",
  color: "#555",
  fontFamily: "Montserrat, Helvetica",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "1.6",
});

const ButtonsWrapper = styled(Box)({
  display: 'flex',
  gap: '16px',
  marginTop: '24px',
});

const StyledButton = styled(Box)({
  all: 'unset',
  alignItems: 'center',
  backgroundColor: '#fd941f',
  borderRadius: '30px',
  boxSizing: 'border-box',
  display: 'inline-flex',
  gap: '12px', 
  justifyContent: 'center',
  padding: '10px 24px', 
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.3s',
  "&:hover": {
    backgroundColor: '#e67e22',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  "&:active": {
    transform: 'translateY(0)',
    boxShadow: 'none',
  },
});

const TextButton = styled(Typography)({
  color: '#ffffff',
  fontFamily: '"Roboto", Helvetica',
  fontSize: '16px',
  fontWeight: 500,
  textAlign: 'center',
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const LinkedInButton = styled(StyledButton)({
  backgroundColor: '#0077B5',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  "&:hover": {
    backgroundColor: '#005582',
  },
});

const LinkedInIcon = styled('img')({
  width: '24px',
  height: '24px',
});

export function DetailsOffre() {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function callApi() {
      try {
        const token = await getAccessTokenSilently();
        const document = await authenticatedGet(token, `/v1/detailsoffre/${id}`);
        setData(document);
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, [getAccessTokenSilently, id]);

  return (
    <Container>
      {loading ? (
        <Box>Chargement...</Box>
      ) : error ? (
        <Typography color="error">{`Offre: response from API (with auth) ${error}`}</Typography>
      ) : (
        <DetailsWrapper>
          <BlocDetails>
            <BlocTop>
              <BlocTitle>
                <Title>{data.titre_emploi}</Title>
                <EntrepriseLieu>
                  <H2>{data.entreprise}</H2>
                  <H2>{data.lieu}</H2>
                </EntrepriseLieu>
                <ContratType>
                  <H3>{data.contrat}</H3>
                  <H3>{data.type_contrat}</H3>
                </ContratType>
              </BlocTitle>
              <BlocDescription>
              <H4 className="text-wrapper-4">Description</H4>
              <Description>{data.description}</Description>
            </BlocDescription>
              <ButtonsWrapper>
                <StyledButton>
                  <TextButton>Postuler maintenant</TextButton>
                </StyledButton>
                <StyledButton>
                  <TextButton>Déposer un CV</TextButton>
                </StyledButton>
                <StyledButton>
                  <TextButton>Déposer une lettre de motivation</TextButton>
                </StyledButton>
                <MuiLink href="https://www.linkedin.com/in/avidan-benguigui-a0aa23220/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <LinkedInButton>
                    <LinkedInIcon src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" />
                    <TextButton>Nous contacter sur LinkedIn</TextButton>
                  </LinkedInButton>
                </MuiLink>
              </ButtonsWrapper>
            </BlocTop>
          </BlocDetails>
        </DetailsWrapper>
      )}
    </Container>
  );
}
