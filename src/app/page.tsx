"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabase";
import { isValidUrl, getShortUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(url)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const slug = nanoid(6);
      const { error } = await supabase
        .from("links")
        .insert([{ slug, longUrl: url }]);

      if (error) throw error;

      const newShortUrl = getShortUrl(slug);
      setShortUrl(newShortUrl);
      toast({
        title: "Success",
        description: "URL shortened successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to shorten URL. Please try again. ${error}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast({
        title: "Success",
        description: "URL copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to copy URL. Please try again. ${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">URL Shortener</h1>
          <p className="mt-2 text-muted-foreground">
            Shorten your long URLs into something more manageable
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="url"
              placeholder="Enter your URL here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
          </Button>
        </form>

        {shortUrl && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">Your shortened URL:</p>
              <p className="text-sm break-all">{shortUrl}</p>
            </div>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full"
            >
              Copy to Clipboard
            </Button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
