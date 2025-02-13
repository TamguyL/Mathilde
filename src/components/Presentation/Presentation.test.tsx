import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';  // Assurez-vous que jest-dom est importé pour les matchers comme 'toBeInTheDocument'
import Presentation from "./Presentation";  // Assurez-vous du bon chemin
import { useFetchData } from "../../data/useFetchData";

// Mock de useFetchData pour retourner des données fictives
jest.mock("../../data/useFetchData", () => ({
  useFetchData: jest.fn(),
}));

describe("Presentation Component", () => {
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
    render(<Presentation />);
  
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
    render(<Presentation />);

    // Vérification que console.log a bien été appelé avec le bon message d'erreur
    expect(logSpy).toHaveBeenCalledWith("Error: Erreur de récupération des données");

    // Réinitialiser le spy après le test
    logSpy.mockRestore();
  });

  it("Affichage : Données JSON", () => {
    // Simuler le retour des données une fois le chargement terminé
    (useFetchData as jest.Mock).mockReturnValue({
      data: {
        presentationData: {
          photo: "test-image.jpg",
          soustitre: "Sous-titre Test",
          accroche: "Accroche Test",
          titre: "Titre Test",
          texte: "Texte HTML Test",
        },
      },
      loading: false,
      error: null,
    });

    // Rendu du composant
    render(<Presentation />);

    // Vérification des éléments rendus
    expect(screen.getByText("Sous-titre Test")).toBeInTheDocument();
    expect(screen.getByText("Accroche Test")).toBeInTheDocument();
    expect(screen.getByText("Titre Test")).toBeInTheDocument();
    expect(screen.getByText("Texte HTML Test")).toBeInTheDocument();
    expect(screen.getByAltText("Imgparcours")).toHaveAttribute("src", "image/test-image.jpg");
  });
});
