import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';  // Assurez-vous que jest-dom est importé pour les matchers comme 'toBeInTheDocument'
import Engagement from "./Engagement";  // Assurez-vous du bon chemin
import { useFetchData } from "../../data/useFetchData";

// Mock de useFetchData pour retourner des données fictives
jest.mock("../../data/useFetchData", () => ({
  useFetchData: jest.fn(),
}));

describe("Engagement Component", () => {
  it("Loading (console.log)", () => {
    // Espionner console.log pour vérifier qu'il n'y a pas de message d'erreur
    const logSpy = jest.spyOn(console, "log").mockImplementation();
  
    // Simuler l'état de chargement
    (useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: true,  // Simule le chargement
      error: null,
    });
  
    // Rendu du composant
    render(<Engagement />);
  
    // Vérifier que le message "Loading data..." a été loggé
    expect(logSpy).toHaveBeenCalledWith("Loading data...");
  
    // Réinitialiser le spy après le test
    logSpy.mockRestore();
  });
  
  it("Error (console.log)", () => {
    // Espionner console.log
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    // Simuler une erreur lors du fetch des données
    (useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "Erreur de récupération des données",
    });

    // Rendu du composant
    render(<Engagement />);

    // Vérification que console.log a bien été appelé avec le bon message d'erreur
    expect(logSpy).toHaveBeenCalledWith("Error: Erreur de récupération des données");

    // Réinitialiser le spy après le test
    logSpy.mockRestore();
  });

  it("Affichage : Données JSON", () => {
    // Simuler le retour des données une fois le chargement terminé
    (useFetchData as jest.Mock).mockReturnValue({
      data: {
        engagementData: {
            titre: "Engagement Titre Test",
            texte: "Engagement Texte Test",
        },
        grosTitre: {
            titre3: "Titre3 Test",
        },
      },
      loading: false,
      error: null,
    });

    // Rendu du composant
    render(<Engagement />);

    // Vérification des éléments rendus
    expect(screen.getByText("Engagement Titre Test")).toBeInTheDocument();
    expect(screen.getByText("Engagement Texte Test")).toBeInTheDocument();
    expect(screen.getByText("Titre3 Test")).toBeInTheDocument();
  });
});
