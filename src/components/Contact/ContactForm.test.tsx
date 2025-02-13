import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';  // Assurez-vous que jest-dom est importé pour les matchers comme 'toBeInTheDocument'
import ContactForm from "./ContactForm";  // Assurez-vous du bon chemin
import { useFetchData } from "../../data/useFetchData";

// Mock de useFetchData pour retourner des données fictives
jest.mock("../../data/useFetchData", () => ({
  useFetchData: jest.fn(),
}));

describe("ContactForm Component", () => {
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
    render(<ContactForm />);
  
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
    render(<ContactForm />);

    // Vérification que console.log a bien été appelé avec le bon message d'erreur
    expect(logSpy).toHaveBeenCalledWith("Error: Erreur de récupération des données");

    // Réinitialiser le spy après le test
    logSpy.mockRestore();
  });

  it("Affichage : Données JSON + Filtre", () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: {
        grosTitre: { titre4: "Titre" },
      },
      loading: false,
      error: null,
    });
  
    render(<ContactForm />);
  
    expect(screen.getByText("Titre")).toBeInTheDocument();
  });
  
  it("Remplir le formulaire", () => {
    render(<ContactForm />);
  
    const nomInput = screen.getByPlaceholderText("Nom") as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText("Mail") as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText("Message") as HTMLTextAreaElement;
  
    // Simuler la saisie dans les champs
    fireEvent.change(nomInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Ceci est un message" } });
  
    // Vérifier que les valeurs ont bien été mises à jour
    expect(nomInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john.doe@example.com");
    expect(messageInput.value).toBe("Ceci est un message");
  });

  it("Transmettre données du formulaire", () => {
    // Mock de la fonction console.log
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
    render(<ContactForm />);
  
    const nomInput = screen.getByPlaceholderText("Nom") as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText("Mail") as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText("Message") as HTMLTextAreaElement;
    const submitButton = screen.getByText("Envoyer !");
  
    // Remplir les champs
    fireEvent.change(nomInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Ceci est un message" } });
  
    // Soumettre le formulaire
    fireEvent.click(submitButton);
  
    // Vérifier que les données sont bien affichées dans la console
    expect(logSpy).toHaveBeenCalledWith('Form data submitted:', {
      nom: "John Doe",
      email: "john.doe@example.com",
      message: "Ceci est un message",
    });
  
    // Nettoyer après le test
    logSpy.mockRestore();
  });
  
});
