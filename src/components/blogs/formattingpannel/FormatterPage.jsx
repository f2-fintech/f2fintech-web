"use client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Chip,
  Avatar,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { CloudUpload, Visibility, ArrowBack } from "@mui/icons-material";
import TiptapEditor from "./TipTapEditor";
import {
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
} from "../../../apis/BlogsAPI";
import API from "../../../apis";

const FormatterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id && id !== "new";

  const [ formData, setFormData ] = useState( {
    title: "",
    content: "",
    excerpt: "",
    category: "Business Loans",
    author: "",
    route: "",
    readTime: "",
    featured: false,
    image: null,
    imagePreview: "",
  } );

  // Store content images separately (file objects)
  const [ contentImages, setContentImages ] = useState( [] );
  const [ isProcessing, setIsProcessing ] = useState( false );
  const [ processingMessage, setProcessingMessage ] = useState( "" );

  const handleClose = () => {
    navigate( "/blogs" );
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if ( !confirmed || !id ) return;

    try {
      setIsProcessing( true );
      setProcessingMessage( "Deleting blog..." );

      const result = await deleteBlog( id );

      if ( result.success ) {
        alert( "Blog deleted successfully!" );
        navigate( "/blogs" );
      } else {
        alert( "Failed to delete blog." );
      }
    } catch ( error ) {
      alert( "Error deleting blog." );
    } finally {
      setIsProcessing( false );
    }
  };

  const theme = {
    primary: "#3244e6",
    secondary: "#ffffff",
    dark: "#ffffff",
    darker: "#f9fafb",
    purple: "#f3f4f6",
    border: "#d1d5db",
  };

  const categories = [
    "Business Loans",
    "Personal Finance",
    "Home Loans",
    "OverDraft Loans",
    "Credit Score",
    "Investment Tips",
    "Banking",
    "Insurance",
  ];

  useEffect( () => {
    if ( isEditMode ) {
      const fetchBlog = async () => {
        try {
          setIsProcessing( true );
          setProcessingMessage( "Loading blog..." );

          if ( typeof getBlogById !== "function" ) {
            console.error( "getBlogById function not implemented" );
            alert( "Blog editing not available yet" );
            navigate( "/blogs" );
            return;
          }

          const result = await getBlogById( id );
          if ( result.success ) {
            setFormData( {
              ...result.blog,
              imagePreview: result.blog.image || "",
            } );
          } else {
            alert( "Failed to fetch blog data" );
            navigate( "/blogs" );
          }
        } catch ( error ) {
          console.error( "Error fetching blog:", error );
          alert( "Error fetching blog data" );
          navigate( "/blogs" );
        } finally {
          setIsProcessing( false );
        }
      };
      fetchBlog();
    } else {
      setFormData( {
        title: "",
        content: "",
        excerpt: "",
        category: "Business Loans",
        author: "",
        route: "",
        readTime: "",
        featured: false,
        image: null,
        imagePreview: "",
      } );
      setContentImages( [] );
    }
  }, [ id, isEditMode, navigate ] );

  const handleInputChange = ( field, value ) => {
    setFormData( ( prev ) => ( { ...prev, [ field ]: value } ) );
  };

  // Featured image upload (same as before - works fine!)
  const handleImageUpload = ( event ) => {
    const file = event.target.files[ 0 ];
    if ( file ) {
      const reader = new FileReader();
      reader.onload = ( e ) => {
        setFormData( ( prev ) => ( {
          ...prev,
          image: file,
          imagePreview: e.target.result,
        } ) );
      };
      reader.readAsDataURL( file );
    }
  };

  // Handle content images from TipTap editor
  const handleContentImageUpload = ( file ) => {
    return new Promise( async ( resolve, reject ) => {
      try {
        // Create a unique filename like blog-1697542240910-random8chars.png
        const timestamp = Date.now();
        const randomString = Math.random().toString( 36 ).substring( 2, 10 );
        const extension = file.name.split( "." ).pop();
        const uniqueFileName = `blog-${ timestamp }-${ randomString }.${ extension }`;

        // Upload file to backend
        const res = await API.DocumentAPI.uploadDocument( {
          document: file,
          folder: `document/blog/${ uniqueFileName }`,
        } );

        if ( res.data.status === "Success" ) {
          const fileUrl = res.data.data || res.data.fileUrl; // adjust per your API

          const imageIndex = contentImages.length;
          const placeholder = `PLACEHOLDER_IMAGE_${ imageIndex }`;

          // Optionally store uploaded image info in state
          setContentImages( ( prev ) => [
            ...prev,
            { file, placeholder, preview: fileUrl },
          ] );


          // Resolve same structure as before
          resolve( {
            preview: fileUrl, // URL returned by your API
            placeholder: placeholder,
            index: imageIndex,
          } );
        } else {
          reject( new Error( "Upload failed" ) );
        }
      } catch ( error ) {
        console.error( "Upload error:", error );
        reject( error );
      }
    } );
  };



  const generateExcerpt = ( content ) => {
    const plainText = content.replace( /<[^>]*>/g, "" );
    return plainText.substring( 0, 150 ) + ( plainText.length > 150 ? "..." : "" );
  };

  const estimateReadTime = ( content ) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace( /<[^>]*>/g, "" ).split( /\s+/ ).length;
    const minutes = Math.ceil( wordCount / wordsPerMinute );
    return `${ minutes } min read`;
  };

  const handlePublish = async () => {
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.author.trim() ||
      !formData.route.trim()
    ) {
      alert(
        "Please fill in all required fields (Title, Content, Author, Route)"
      );
      return;
    }

    // Prepare content - replace base64 with placeholders
    let preparedContent = formData.content;
    contentImages.forEach( ( _, index ) => {
      const placeholder = `{{contentImage${ index }}}`;
      // This will be replaced on backend with actual S3 URLs
    } );

    const blogData = {
      title: formData.title,
      excerpt: formData.excerpt || generateExcerpt( formData.content ),
      category: formData.category,
      featured: formData.featured,
      author: formData.author,
      route: formData.route,
      date: new Date().toLocaleDateString( "en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      } ),
      readTime: formData.readTime || estimateReadTime( formData.content ),
      href: "/personal-loan-blogs",
      content: preparedContent,
      imageFile: formData.image, // Featured image
    };

    // Add content images to blogData
    contentImages.forEach( ( file, index ) => {
      blogData[ `contentImage${ index }` ] = file;
    } );

    try {
      setIsProcessing( true );
      const totalImages = contentImages.length + ( formData.image ? 1 : 0 );
      setProcessingMessage(
        totalImages > 0
          ? `Uploading ${ totalImages } image(s)...`
          : isEditMode
            ? "Updating blog..."
            : "Publishing blog..."
      );

      let result;
      if ( isEditMode ) {
        result = await updateBlog( id, blogData );
      } else {
        result = await createBlog( blogData );
      }

      if ( result.success ) {
        alert( `Blog ${ isEditMode ? "updated" : "saved" } successfully!` );
        navigate( "/blogs" );
      } else {
        alert( `Failed to ${ isEditMode ? "update" : "save" } blog.` );
      }
    } catch ( error ) {
      console.error( "Error saving blog:", error );
      alert( "Server error while saving blog. Check console for details." );
    } finally {
      setIsProcessing( false );
    }
  };

  return (
    <Box
      sx={ {
        minHeight: "100vh",
        bgcolor: theme.dark,
        background: `linear-gradient(to bottom, ${ theme.dark }, ${ theme.darker })`,
        color: "black",
        py: 2,
      } }
    >
      {/* Processing Backdrop */ }
      <Backdrop
        sx={ {
          color: "#fff",
          zIndex: ( theme ) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        } }
        open={ isProcessing }
      >
        <Box
          sx={ {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          } }
        >
          <CircularProgress color="inherit" size={ 60 } />
          <Typography variant="h6">{ processingMessage }</Typography>
          <Typography variant="body2" sx={ { maxWidth: 400, textAlign: "center" } }>
            Please wait while we process your blog...
          </Typography>
        </Box>
      </Backdrop>

      <Container maxWidth="xl">
        <Box
          sx={ {
            bgcolor: theme.dark,
            background: `linear-gradient(to bottom, ${ theme.dark }, ${ theme.darker })`,
            color: "black",
            border: `1px solid ${ theme.border }40`,
            borderRadius: 2,
            boxShadow: 24,
            overflow: "hidden",
          } }
        >
          {/* Header */ }
          <Box
            sx={ {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              borderBottom: "1px solid #374151",
            } }
          >
            <Typography
              variant="h4"
              component="h1"
              sx={ {
                fontWeight: 600,
                color: "#1f2937",
              } }
            >
              { isEditMode ? `Edit Blog Post #${ id }` : "Create New Blog Post" }
            </Typography>
            <Button
              onClick={ handleClose }
              variant="outlined"
              startIcon={ <ArrowBack /> }
              sx={ {
                borderColor: "#374151",
                color: "black",
                "&:hover": {
                  borderColor: "#6b7280",
                  bgcolor: "#9ca3af",
                },
              } }
            >
              Back to Blogs
            </Button>
          </Box>

          {/* Body */ }
          <Box
            sx={ {
              p: 3,
              display: "flex",
              flexDirection: "column",
            } }
          >
            <Grid container spacing={ 3 } sx={ { minHeight: "70vh" } }>
              {/* Left Panel - Form Fields */ }
              <Grid item xs={ 12 } md={ 4 }>
                <Box sx={ { display: "flex", flexDirection: "column", gap: 2 } }>
                  <TextField
                    fullWidth
                    label="Blog Title *"
                    value={ formData.title }
                    onChange={ ( e ) => handleInputChange( "title", e.target.value ) }
                    sx={ {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.purple,
                        color: "black",
                      },
                      "& .MuiInputLabel-root": { color: "#6b7280" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.border,
                      },
                    } }
                  />

                  <TextField
                    fullWidth
                    label="Author Name *"
                    value={ formData.author }
                    onChange={ ( e ) =>
                      handleInputChange( "author", e.target.value )
                    }
                    sx={ {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.purple,
                        color: "black",
                      },
                      "& .MuiInputLabel-root": { color: "#6b7280" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.border,
                      },
                    } }
                  />

                  <FormControl fullWidth>
                    <InputLabel sx={ { color: "#9ca3af" } }>Category</InputLabel>
                    <Select
                      value={ formData.category }
                      onChange={ ( e ) =>
                        handleInputChange( "category", e.target.value )
                      }
                      sx={ {
                        backgroundColor: theme.purple,
                        color: "black",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.border,
                        },
                      } }
                    >
                      { categories.map( ( category ) => (
                        <MenuItem key={ category } value={ category }>
                          { category }
                        </MenuItem>
                      ) ) }
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Excerpt (Optional)"
                    multiline
                    rows={ 3 }
                    value={ formData.excerpt }
                    onChange={ ( e ) =>
                      handleInputChange( "excerpt", e.target.value )
                    }
                    placeholder="Brief description of the blog post"
                    sx={ {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.purple,
                        color: "black",
                      },
                      "& .MuiInputLabel-root": { color: "#6b7280" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.border,
                      },
                    } }
                  />

                  <TextField
                    fullWidth
                    label="Dynamic route *"
                    value={ formData.route }
                    onChange={ ( e ) => handleInputChange( "route", e.target.value ) }
                    sx={ {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.purple,
                        color: "black",
                      },
                      "& .MuiInputLabel-root": { color: "#6b7280" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.border,
                      },
                    } }
                  />

                  <TextField
                    fullWidth
                    label="Read Time (Optional)"
                    value={ formData.readTime }
                    onChange={ ( e ) =>
                      handleInputChange( "readTime", e.target.value )
                    }
                    placeholder="e.g., 5 min read"
                    sx={ {
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.purple,
                        color: "black",
                      },
                      "& .MuiInputLabel-root": { color: "#6b7280" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.border,
                      },
                    } }
                  />

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={ { mb: 1, color: "#6b7280" } }
                    >
                      Featured Image
                    </Typography>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={ <CloudUpload /> }
                      fullWidth
                      sx={ {
                        color: "#6b7280",
                        borderColor: "#374151",
                        "&:hover": {
                          borderColor: "#6b7280",
                          color: "#374151",
                        },
                      } }
                    >
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={ handleImageUpload }
                      />
                    </Button>
                    { formData.imagePreview && (
                      <Box sx={ { mt: 2 } }>
                        <img
                          src={ formData.imagePreview }
                          alt="Preview"
                          style={ {
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          } }
                        />
                      </Box>
                    ) }
                  </Box>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={ formData.featured }
                        onChange={ ( e ) =>
                          handleInputChange( "featured", e.target.checked )
                        }
                        sx={ {
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: theme.primary,
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: theme.primary,
                          },
                        } }
                      />
                    }
                    label="Featured Post"
                    sx={ { color: "#6b7280" } }
                  />

                  {/* Image Counter */ }
                  { contentImages.length > 0 && (
                    <Box
                      sx={ {
                        p: 2,
                        bgcolor: "#dbeafe",
                        borderRadius: 1,
                        border: "1px solid #3b82f6",
                      } }
                    >
                      <Typography variant="body2" sx={ { color: "#1e40af" } }>
                        📸 { contentImages.length } image(s) in content
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={ { color: "#1e40af", display: "block", mt: 0.5 } }
                      >
                        Will be uploaded to S3 on publish
                      </Typography>
                    </Box>
                  ) }
                </Box>
              </Grid>

              {/* Center Panel - Editor */ }
              <Grid item xs={ 12 } md={ 4 }>
                <Box
                  sx={ {
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  } }
                >
                  <Typography variant="h6" sx={ { mb: 2, color: "#6b7280" } }>
                    Content Editor
                  </Typography>
                  <Paper
                    sx={ {
                      flexGrow: 1,
                      minHeight: "500px",
                      bgcolor: theme.purple,
                      border: `1px solid ${ theme.border }80`,
                      borderRadius: 1,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    } }
                  >
                    <Box sx={ { flexGrow: 1, overflow: "auto" } }>
                      <TiptapEditor
                        content={ formData.content }
                        setContent={ ( content ) =>
                          handleInputChange( "content", content )
                        }
                        onImageUpload={ handleContentImageUpload }
                        editorOptions={ { immediatelyRender: false } }
                      />
                    </Box>
                  </Paper>
                </Box>
              </Grid>

              {/* Right Panel - Preview */ }
              <Grid item xs={ 12 } md={ 4 }>
                <Box
                  sx={ {
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  } }
                >
                  <Typography variant="h6" sx={ { mb: 2, color: "#6b7280" } }>
                    Live Preview
                  </Typography>
                  <Paper
                    sx={ {
                      flexGrow: 1,
                      minHeight: "500px",
                      p: 3,
                      bgcolor: theme.purple,
                      border: `1px solid ${ theme.border }80`,
                      borderRadius: 1,
                      overflow: "auto",
                    } }
                  >
                    { formData.imagePreview && (
                      <Box sx={ { mb: 3 } }>
                        <img
                          src={ formData.imagePreview }
                          alt="Featured"
                          style={ {
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          } }
                        />
                      </Box>
                    ) }

                    <Box
                      sx={ { mb: 2, display: "flex", gap: 1, flexWrap: "wrap" } }
                    >
                      <Chip
                        label={ formData.category }
                        size="small"
                        sx={ {
                          bgcolor: "#e0e7ff",
                          color: "#1e40af",
                        } }
                      />
                      { formData.featured && (
                        <Chip
                          label="Featured"
                          size="small"
                          sx={ {
                            bgcolor: "#e0e7ff",
                            color: "#1e40af",
                          } }
                        />
                      ) }
                    </Box>

                    <Typography
                      variant="h5"
                      sx={ {
                        mb: 2,
                        color: "black",
                        fontWeight: "bold",
                      } }
                    >
                      { formData.title || "Blog Title" }
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={ {
                        mb: 3,
                        color: "#9ca3af",
                        fontStyle: "italic",
                      } }
                    >
                      { formData.excerpt || generateExcerpt( formData.content ) }
                    </Typography>

                    <Box
                      sx={ {
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                      } }
                    >
                      <Avatar
                        sx={ {
                          width: 32,
                          height: 32,
                          bgcolor: "#e0e7ff",
                          color: "#1e3a8a",
                          fontSize: "0.875rem",
                        } }
                      >
                        { formData.author.charAt( 0 ) || "A" }
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={ { color: "black", fontWeight: 500 } }
                        >
                          { formData.author || "Author Name" }
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={ { color: "#9ca3af", fontSize: "0.75rem" } }
                        >
                          { new Date().toLocaleDateString( "en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          } ) }{ " " }
                          •{ " " }
                          { formData.readTime ||
                            estimateReadTime( formData.content ) }
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={ {
                        color: "black",
                        "& *": { color: "inherit" },
                        "& h1, & h2, & h3": {
                          marginTop: "1rem",
                          marginBottom: "0.5rem",
                        },
                        "& p": { marginBottom: "1rem", lineHeight: 1.6 },
                        "& ul, & ol": {
                          paddingLeft: "1.5rem",
                          marginBottom: "1rem",
                        },
                        "& img": {
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "8px",
                          margin: "1rem 0",
                        },
                      } }
                      dangerouslySetInnerHTML={ { __html: formData.content } }
                    />
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Footer */ }
          <Box
            sx={ {
              p: 3,
              borderTop: "1px solid #374151",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            } }
          >
            <Typography variant="body2" sx={ { color: "#9ca3af" } }>
              * Required fields: Title, Content, Author, Route
            </Typography>
            <Box sx={ { display: "flex", gap: 2 } }>
              <Button
                variant="outlined"
                onClick={ handleClose }
                sx={ {
                  borderColor: "#374151",
                  color: "black",
                  "&:hover": {
                    borderColor: "#6b7280",
                    bgcolor: "#f3f4f6",
                  },
                } }
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={ handlePublish }
                startIcon={ <Visibility /> }
                sx={ {
                  bgcolor: theme.primary,
                  color: "white",
                  "&:hover": { bgcolor: "#2a3bdc" },
                } }
              >
                { isEditMode ? "Update Blog" : "Publish Blog" }
              </Button>

              { isEditMode && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={ handleDelete }
                  sx={ {
                    borderColor: "#ef4444",
                    color: "#ef4444",
                    "&:hover": {
                      bgcolor: "#ef444430",
                      borderColor: "#dc2626",
                      color: "#dc2626",
                    },
                  } }
                >
                  Delete
                </Button>
              ) }
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FormatterPage;
