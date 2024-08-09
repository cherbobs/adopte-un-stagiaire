import { useState } from "react";
import { Box, Typography, styled, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { authenticatedPost } from "../auth/helper";

const CardBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "16px",
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  backgroundColor: "#ffffff",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
  },
}));

const DetailsBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "20px",
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(1),
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "18px",
  marginBottom: theme.spacing(1),
}));

const Description = styled(Typography)({
  marginTop: "8px",
  color: "#555555",
});

interface Offre {
  id: string;
  entreprise: string;
  lieu: string;
  titre_emploi: string;
  contrat: string;
  type_contrat: string;
  description_courte: string;
}

interface Props {
  offre: Offre;
}

export function OffresCard(props: Props) {
  const navigate = useNavigate();
  const { getAccessTokenSilently, user } = useAuth0();
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    navigate("/" + "details/" + props.offre.id);
  };

  const handleSelection = async () => {
    try {
      const token = await getAccessTokenSilently();
      const body = { userId: user?.sub, offerId: props.offre.id };
      const response = await authenticatedPost(token, "v1/selection", body);
      if (response.ok) {
        setSelected(true);
      } else {
        console.error("Failed to select Offre");
      }
    } catch (error) {
      console.error("Error selecting Offre:", error);
    }
  };

  return (
    <CardBox>
      <DetailsBox onClick={handleClick}>
        <Title>
          {props.offre.entreprise} - {props.offre.lieu}
        </Title>
        <SubTitle>{props.offre.titre_emploi}</SubTitle>
        <Typography variant="subtitle2">
          {props.offre.contrat} - {props.offre.type_contrat}
        </Typography>
        <Description>{props.offre.description_courte}</Description>
      </DetailsBox>
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleSelection}>
          {selected ? (
            <StarIcon style={{ color: "#fd941f" }} />
          ) : (
            <StarBorderIcon style={{ color: "#fd941f" }} />
          )}
        </IconButton>
      </Box>
    </CardBox>
  );
}
