"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCardActions } from "./file-actions";

interface ColumnProps {
  row: {
    original: {
      _id: Id<"files">;
      _creationTime: number;
      shouldDelete?: boolean;
      type: "image" | "csv" | "pdf";
      name: string;
      orgId: string;
      fileId: Id<"_storage">;
      userId: Id<"users">;
      isFavorited: boolean;
      // Ensure url is part of the type definition, even if nullable
      url: string | null; 
    } & { [key: string]: any }; // This line might be unnecessary depending on your usage
  };
}

const Columns: React.FC<ColumnProps> = ({ row }) => {
  return (
    <div>
      {/* ... other code */}
      {row.original.url && ( <img src={row.original.url} alt={row.original.name} /> )}
    </div>
  );
};

export default Columns;