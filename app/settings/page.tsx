import React from 'react';

// Página de Configuración
export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-foreground mb-8">Configuración</h1>
      <div className="w-full max-w-md bg-card p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-muted-foreground">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-input text-foreground"
            placeholder="Tu nombre de usuario"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-muted-foreground">Foto de Perfil</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            className="mt-1 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}