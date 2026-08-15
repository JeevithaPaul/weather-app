import React, { useState } from "react";
import axios from "axios";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const getWeather = async () => {
        const cityName = city.trim();

        if (!cityName) {
            setError("Please enter a city name");
            setWeather(null);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const url =
                `https://api.openweathermap.org/data/2.5/weather` +
                `?q=${cityName}` +
                `&appid=${process.env.REACT_APP_WEATHER_API_KEY}` +
                `&units=metric`;

            const response = await axios.get(url);

            setWeather(response.data);
        } catch (error) {
            setWeather(null);

            if (error.response?.status === 404) {
                setError("City not found. Please check the city name.");
            } else {
                setError("Unable to get weather information.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getWeather();
    };

    return (
        <div className="weather-container">

            {/* Search Section */}

            <form className="search-box" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {/* Error Message */}

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {/* Loading Message */}

            {loading && (
                <p className="loading">
                    Getting weather information...
                </p>
            )}

            {/* Weather Heading */}

            {weather && !loading && (
                <h2>
                    Current Weather
                </h2>
            )}

            {/* Weather Result */}

            {weather && !loading && (
                <div className="weather-card">

                    {/* Location */}

                    <div className="weather-location">
                        <h3>
                            {weather.name}, {weather.sys.country}
                        </h3>
                    </div>

                    {/* Weather Icon */}

                    <img
                        className="weather-icon"
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                        alt={weather.weather[0].description}
                    />

                    {/* Temperature */}

                    <div className="temperature">
                        {Math.round(weather.main.temp)}°C
                    </div>

                    {/* Weather Condition */}

                    <p className="weather-condition">
                        {weather.weather[0].description}
                    </p>

                    {/* Weather Details */}

                    <div className="weather-details">

                        {/* Humidity */}

                        <div className="detail">
                            <span>💧</span>

                            <div>
                                <small>Humidity</small>

                                <strong>
                                    {weather.main.humidity}%
                                </strong>
                            </div>
                        </div>

                        {/* Wind */}

                        <div className="detail">
                            <span>💨</span>

                            <div>
                                <small>Wind Speed</small>

                                <strong>
                                    {weather.wind.speed} m/s
                                </strong>
                            </div>
                        </div>

                        {/* Feels Like */}

                        <div className="detail">
                            <span>🌡️</span>

                            <div>
                                <small>Feels Like</small>

                                <strong>
                                    {Math.round(weather.main.feels_like)}°C
                                </strong>
                            </div>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Weather;