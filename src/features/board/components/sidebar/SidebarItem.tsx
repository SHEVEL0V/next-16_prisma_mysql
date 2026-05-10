/** @format */
"use client";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import EditableTextField from "@/components/ui/fields/EditableTextField";
import { MoreButton } from "@/components/ui/buttons";
import { deleteBoardAction, updateBoardAction } from "../../actions";

interface SidebarItemProps {
  id: string;
  title: string;
  isActive: boolean;
  isOpen: boolean;
}

export default function SidebarItem({
  id,
  title,
  isActive,
  isOpen,
}: SidebarItemProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [, updateAction] = useActionState(updateBoardAction, {
    success: false,
    errors: {},
  });
  const [, deleteAction] = useActionState(deleteBoardAction, {
    success: false,
    errors: {},
  });

  const handleSubmit = async (formData: FormData) => {
    updateAction(formData);
    setIsEditing(false);
  };

  return (
    <ListItem
      disablePadding
      sx={{ mb: 0.5, "&:hover .more-btn": { opacity: 1 } }}
    >
      <Tooltip title={title} placement="right" disableHoverListener={isOpen}>
        <ListItemButton
          selected={isOpen && isActive}
          component={isEditing ? "div" : Link}
          href={isEditing ? undefined : `?id=${id}`}
          sx={{ borderRadius: 2, px: isOpen ? 2 : 1, minHeight: 48 }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              // minWidth: isOpen ? 40 : "auto",
              // mr: isOpen ? 1 : "auto",
              justifyContent: "center",
            }}
          >
            <ViewKanbanIcon color={isActive ? "primary" : "inherit"} />
          </ListItemIcon>

          {isOpen && (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {isEditing ? (
                <form
                  action={handleSubmit}
                  ref={formRef}
                  style={{ width: "100%" }}
                >
                  <input type="hidden" name="id" value={id} />
                  <EditableTextField
                    defaultValue={title}
                    name="title"
                    autoFocus
                    handleToggleEdit={setIsEditing}
                    formRef={formRef}
                  />
                </form>
              ) : (
                <>
                  <Typography variant="body1" noWrap sx={{ flexGrow: 1 }}>
                    {title}
                  </Typography>
                  <Box
                    className="more-btn"
                    sx={{ opacity: { xs: 1, md: 0 }, transition: "0.2s" }}
                  >
                    <MoreButton
                      onEdit={() => setIsEditing(true)}
                      id={id}
                      deleteAction={deleteAction}
                    />
                  </Box>
                </>
              )}
            </Box>
          )}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}
