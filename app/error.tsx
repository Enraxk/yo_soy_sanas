"use client";
import GlobalError from "./Error/500er";

export default function ErrorPage(props: { error: Error; reset: () => void }) {
  return <GlobalError {...props} />;
}