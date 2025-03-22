import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";

function BlogCard({ blog }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
      className="cursor-pointer shrink w-[345px]"
    >
      <CardMedia
        component="img"
        height="200"
        image={process.env.REACT_APP_API_Aws_Image_BASE_URL + blog?.coverImage}
        alt={blog?.title}
        sx={{
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        className="h-[15rem]"
      />
      <CardContent
        sx={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "text.primary",
            lineHeight: 1.2,
          }}
        >
          {blog?.title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          sx={{
            fontWeight: 500,
            color: "text.secondary",
            opacity: 0.8,
          }}
        >
          By {blog?.authorName} |{" "}
          {new Date(blog?.publishedAt).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.5,
          }}
        >
          {blog?.content.replace(/<[^>]+>/g, "")}
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 2,
            fontWeight: 600,
            background: "linear-gradient(45deg, #6A1B9A 30%, #4A0072 90%)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)",
            },
          }}
          onClick={() =>
            navigate(`${internalRoutes?.singleBlog + "/" + blog?._id}`)
          }
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
