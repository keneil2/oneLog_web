export function useNotify() {
  const toast = useToast();

  function success(description: string, title = "Success") {
    toast.add({
      title,
      description,
      icon: "i-lucide-circle-check",
      color: "success",
      progress: false,
    });
  }

  return { success };
}
