"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCardActions } from "./file-actions";
import Image from "next/image";

// Interface pour le type de données de vos fichiers (à adapter si nécessaire)
interface File {
  _id: Id<"files">;
  _creationTime: number;
  shouldDelete?: boolean;
  type: "image" | "csv" | "pdf";
  name: string;
  orgId: string;
  fileId: Id<"_storage">;
  userId: Id<"users">;
  isFavorited: boolean;
  url: string | null; 
}

// Configuration des colonnes 
export const columns: ColumnDef<File>[] = [
  {
    accessorKey: "name", // La clé pour accéder à la donnée dans l'objet File
    header: "Nom",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <div className="flex items-center gap-x-2">
          {/* Affichez une icône en fonction du type de fichier */}
          {file.type === 'image' ? (
            <Image 
              src={file.url || ''}
              alt={file.name}
              width={20}
              height={20}
              className="rounded-sm"
            />
          ) : file.type === 'pdf' ? (
            <span className="text-red-500">PDF</span> 
          ) : (
            <span className="text-gray-500">CSV</span>
          )}
          <span>{file.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "_creationTime",
    header: "Date",
    cell: ({ row }) => {
      return (
        <span>
          {formatRelative(new Date(row.original._creationTime), new Date())}
        </span>
      );
    },
  },
  {
    accessorKey: "userId", // Ou une autre clé pour identifier le propriétaire
    header: "Propriétaire",
    cell: ({ row }) => {
      const userId = row.original.userId; 
      // ... Logique pour récupérer les infos de l'utilisateur (ex: avec useQuery) 
      // ... et afficher son nom/avatar
      return (
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {/* ... Initiales de l'utilisateur */}
            </AvatarFallback>
          </Avatar>
          <span>{/* ... Nom de l'utilisateur */}</span>
        </div>
      );
    },
  },
  {
    id: "actions", // Un id est nécessaire pour une colonne d'actions
    header: "Actions",
    cell: ({ row }) => {
      //return <FileCardActions file={row.original} />; // Composant pour vos actions
    },
  },
];