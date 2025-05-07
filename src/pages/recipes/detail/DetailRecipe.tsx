import { LinkButton, MaterialButton } from "@/components/Material/MaterialButton";
import { useFetch } from "@/hooks/useFetch";
import { recipeServiceParams } from "@/services/recipes/recipesService";
import { Box, Typography, CircularProgress,  useTheme, useMediaQuery, Paper } from "@mui/material";
import { useParams } from "react-router";
import { IRecipe } from "../myRecipes/types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const DetailRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const {
    data: dataDetail,
    loading,
    error,
    refetch,
  } = useFetch<IRecipe>(recipeServiceParams.detail(id!));

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress color="primary" size={48} thickness={4} />
        <Typography 
          sx={{ 
            mt: 3, 
            color: 'rgba(35, 35, 50, 0.8)',
            fontWeight: 500
          }}
        >
          Cargando receta...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          gap: 2
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ color: 'rgba(35, 35, 50, 0.8)' }}
        >
          Ocurrió un error al cargar el detalle de la receta
        </Typography>
        <MaterialButton 
          onClick={() => refetch()}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Recargar datos
        </MaterialButton>
      </Box>
    );
  }

  if (!dataDetail) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          gap: 2
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ color: 'rgba(35, 35, 50, 0.8)' }}
        >
          No hay datos para esta receta
        </Typography>
        <LinkButton 
          href="/myRecipes"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <ArrowBackIcon fontSize="small" />
          Volver a mis recetas
        </LinkButton>
      </Box>
    );
  }

  // Calcular tiempo estimado (5 min por ingrediente, 10 min por instrucción)
  const estimatedTime = (dataDetail.ingredients.length * 5) + (dataDetail.instructions.length * 10);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
    >
      <LinkButton 
        href="/myRecipes"
        sx={{
          alignSelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
          px: 2,
          py: 1,
          backgroundColor: 'rgba(35, 35, 50, 0.05)',
          borderRadius: '8px',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(35, 35, 50, 0.1)',
            transform: 'translateX(-5px)'
          }
        }}
      >
        <ArrowBackIcon fontSize="small" />
        Volver a mis recetas
      </LinkButton>

      {/* Cabecera: imagen, título y descripción */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 4 },
          width: '100%',
          backgroundColor: 'rgba(35, 35, 50, 0.75)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Imagen */}
        <Box
          sx={{
            width: { xs: '100%', md: '40%' },
            height: { xs: '250px', md: 'auto' },
            minHeight: { md: '350px' },
          }}
        >
          <Box
            component="img"
            src={dataDetail.image || "https://via.placeholder.com/400x400?text=Sin+imagen"}
            alt={dataDetail.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Información */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={{
                color: 'white',
                fontWeight: 600,
                mb: 2,
              }}
            >
              {dataDetail.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              {dataDetail.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: theme.palette.primary.main,
            }}
          >
            <AccessTimeIcon />
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Tiempo estimado: {estimatedTime} minutos
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Sección de ingredientes e instrucciones */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          mt: 3,
        }}
      >
        {/* Ingredientes */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            padding: 3,
            borderRadius: '12px',
            backgroundColor: 'rgba(35, 35, 50, 0.75)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5, 
              mb: 2,
              pb: 1,
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <RestaurantIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 600,
              }}
            >
              Ingredientes
            </Typography>
          </Box>

          <Box component="ul" sx={{ 
            listStyleType: 'none',
            padding: 0,
            margin: 0
          }}>
            {dataDetail.ingredients.map((ingredient, index) => (
              <Box
                component="li"
                key={`${ingredient}-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: index !== dataDetail.ingredients.length - 1 ? 
                    '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}
                >
                  {index + 1}
                </Box>
                {ingredient}
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Instrucciones */}
        <Paper
          elevation={3}
          sx={{
            flex: 1.5,
            padding: 3,
            borderRadius: '12px',
            backgroundColor: 'rgba(35, 35, 50, 0.75)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5, 
              mb: 2,
              pb: 1,
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <AccessTimeIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 600,
              }}
            >
              Preparación
            </Typography>
          </Box>

          <Box component="ol" sx={{ 
            paddingLeft: '25px',
            margin: 0
          }}>
            {dataDetail.instructions.map((instruction, index) => (
              <Box
                component="li"
                key={`${instruction}-${index}`}
                sx={{
                  padding: '12px 0',
                  borderBottom: index !== dataDetail.instructions.length - 1 ? 
                    '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  color: 'rgba(255, 255, 255, 0.9)',
                  '&::marker': {
                    color: theme.palette.primary.main,
                    fontWeight: 'bold'
                  }
                }}
              >
                {instruction}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DetailRecipe;