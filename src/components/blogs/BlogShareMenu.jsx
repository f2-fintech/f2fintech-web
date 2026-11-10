"use client"
import { SpeedDial, SpeedDialAction, SpeedDialIcon, useMediaQuery, useTheme } from "@mui/material"
import { Share, Facebook, Twitter, LinkedIn, WhatsApp } from "@mui/icons-material"

export const MobileShareMenu = ({ blog, brandColors }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    if (!isMobile) return null

    const shareActions = [
        {
            icon: <Facebook />,
            name: "Facebook",
            action: () => window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank"),
            color: "#1877f2",
        },
        {
            icon: <Twitter />,
            name: "Twitter",
            action: () =>
                window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog?.title}`, "_blank"),
            color: "#1da1f2",
        },
        {
            icon: <LinkedIn />,
            name: "LinkedIn",
            action: () => window.open(`https://linkedin.com/sharing/share-offsite/?url=${window.location.href}`, "_blank"),
            color: "#0077b5",
        },
        {
            icon: <WhatsApp />,
            name: "WhatsApp",
            action: () => window.open(`https://wa.me/?text=${blog?.title} ${window.location.href}`, "_blank"),
            color: "#25d366",
        },
    ]

    return (
        <SpeedDial
            ariaLabel="Share blog post"
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                "& .MuiFab-primary": {
                    bgcolor: brandColors.primary,
                    "&:hover": {
                        bgcolor: brandColors.secondary,
                    },
                },
            }}
            icon={<SpeedDialIcon icon={<Share />} />}
        >
            {shareActions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.action}
                    sx={{
                        "& .MuiFab-primary": {
                            bgcolor: action.color,
                            "&:hover": {
                                bgcolor: action.color,
                                opacity: 0.8,
                            },
                        },
                    }}
                />
            ))}
        </SpeedDial>
    )
}
