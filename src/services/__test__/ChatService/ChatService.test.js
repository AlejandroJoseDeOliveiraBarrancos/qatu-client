import { fetchAIResponse } from "../../ChatService"; // Make sure to use the correct path

// Mock the fetch API
global.fetch = jest.fn();

describe("fetchAIResponse", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return advice if the response is successful", async () => {
    const mockAdvice = "Be yourself.";
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ slip: { advice: mockAdvice } }),
    };
    fetch.mockResolvedValue(mockResponse);

    const result = await fetchAIResponse();

    expect(fetch).toHaveBeenCalledWith("https://api.adviceslip.com/advice");
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toBe(mockAdvice);
  });

  it("should throw an error if the response is not 'ok'", async () => {
    const mockResponse = {
      ok: false,
    };
    fetch.mockResolvedValue(mockResponse);

    const result = await fetchAIResponse();

    expect(fetch).toHaveBeenCalledWith("https://api.adviceslip.com/advice");
    expect(result).toBe("Lo siento, no pude procesar tu solicitud.");
  });

});
