{ pkgs, ... }: {
  # RECOMENDACIÓN: Actualiza al canal 24.11 para mejor soporte de Node 22
  channel = "stable-24.11"; 

  packages = [
    pkgs.nodejs_22
  ];

  # CORRECCIÓN: Sin comas entre las cadenas
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];

  idx.previews = {
    previews = {
      web = {
        # CORRECCIÓN: Sin comas en la lista de comandos
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}