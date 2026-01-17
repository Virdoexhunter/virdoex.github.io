import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertMessage } from "@shared/schema";

export function useSubmitContact() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      // Validate locally first using schema from shared/routes if needed, 
      // but api contract handles it on server. 
      // We pass the raw data object which matches the contract.
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to send message");
      }
      
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Transmission Successful",
        description: "Your secure message has been encrypted and sent to the mainframe.",
        className: "border-primary text-primary font-mono bg-black",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Transmission Failed",
        description: error.message,
        variant: "destructive",
        className: "font-mono border-destructive bg-black",
      });
    }
  });
}
