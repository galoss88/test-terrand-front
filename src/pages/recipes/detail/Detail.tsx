import { MuiCard } from "@/components/Material/MuiCard";
import { StyledContainer, StyledText } from "@/pages/auth/styles";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IRecipe } from "../myRecipes/types";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [dataDetail, setDataDetail] = useState<IRecipe>();
  useEffect(() => {
    console.log(id);
    const url = "http://localhost:3000/recipes";
    fetch(`${url}/?id=${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        const cleanData = Array.isArray(data) ? data[0] : data;
        console.log("cleanData", cleanData);

        setDataDetail(cleanData);
      });
  }, [id]);
  if (!dataDetail) return <>No hay datos para esta receta.</>;
  return (
    <StyledContainer
      maxWidth={false}
      sx={{ gap: { xs: 1, md: 3 }, backgroundColor: "tranparent" }}
    >
      {/* Seccion imagen con titulo y descripcion */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1 },
          mt: { xs: 1 },
          flexDirection: { xs: "column", md: "row" },
        }}
        component={"section"}
      >
        <Box sx={{ display: "flex" }} component={"section"}>
          <MuiCard>
            <MuiCard.Media image={dataDetail.image}></MuiCard.Media>
          </MuiCard>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          component={"section"}
        >
          <StyledText variant="h1">{dataDetail?.title}</StyledText>
          <StyledText variant="h6">{dataDetail?.description}</StyledText>
        </Box>
      </Box>

      {/* Seccion de ingredientes y instrucciones */}
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: { xs: 1, md: 3 } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 0, md: 0 },
          }}
        >
          <StyledText>Ingredientes</StyledText>
          <ul>
            {dataDetail.ingredients.map((ingredient) => {
              return <li key={ingredient}>{ingredient}</li>;
            })}
          </ul>
        </Box>

        <ul>
          {dataDetail.instructions.map((ingredient, index) => {
            return <li key={ingredient}>{`${index}) ${ingredient}`}</li>;
          })}
        </ul>
      </Box>
    </StyledContainer>
  );
};

export default Detail;
