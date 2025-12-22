"use client";

/**
 * useSimpleEdit is disabled: editing is not available in this build.
 * Returns a constant false `isEditMode` and a noop setter for compatibility.
 */
export function useSimpleEdit() {
  const setIsEditMode = (_: boolean) => {};
  return {
    isEditMode: false,
    setIsEditMode,
  } as const;
}
