"use client";

import { useState } from "react";
import { GematriaResult } from "@/lib/gematriaTypes";

export default function Home() {
    const [text, setText] = useState("");
    const [result, setResult] = useState<GematriaResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCalculate = async () => {
        // Validate input
        if (!text.trim()) {
            setError("אנא הזן טקסט לחישוב");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/gematria", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error("Failed to calculate");
            }

            const data: GematriaResult = await response.json();
            setResult(data);
        } catch (err) {
            setError("אירעה שגיאה בחישוב. נסו שוב.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const copyResults = () => {
        if (!result) return;

        const frequencyText = result.frequencies
            .map((f) => `${f.letter}: ${f.count}`)
            .join(", ");

        const textToCopy = `סך כל האותיות: ${result.totalLetters}
גימטריה פשוטה: ${result.sumPashut}
גימטריית מילוי: ${result.sumMilui}
גימטריית מילוי דמילוי: ${result.sumMiluiDeMilui}

תדירות אותיות:
${frequencyText}`;

        navigator.clipboard.writeText(textToCopy).then(
            () => {
                alert("התוצאות הועתקו ללוח!");
            },
            (err) => {
                console.error("Failed to copy:", err);
                alert("שגיאה בהעתקה");
            }
        );
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="bg-blue-50 border-b border-blue-100 py-8 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-blue-900 mb-2">
                        גימטריה ערכים מתקדמים
                    </h1>
                    <p className="text-lg text-blue-700">
                        כלי מתקדם לחישוב גימטריה פשוטה, מילוי ומילוי דמילוי
                    </p>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Input Section */}
                <div className="mb-6">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="הדביקו כאן טקסט בעברית לחישוב גימטריה..."
                        className="w-full h-48 p-4 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-lg resize-none"
                        dir="rtl"
                    />
                    <div className="mt-2 text-sm text-gray-600">
                        <p>סך כל התווים: {text.length}</p>
                        <p className="text-blue-600">
                            רק אותיות בעברית נספרות ונכנסות לחישוב.
                        </p>
                        {text.length > 50000 && (
                            <p className="text-orange-600 font-semibold mt-1">
                                טקסט ארוך מאוד עלול להימשך כמה שניות לעיבוד.
                            </p>
                        )}
                    </div>
                    {error && (
                        <div className="mt-2 text-red-600 font-semibold">{error}</div>
                    )}
                </div>

                {/* Calculate Button */}
                <div className="mb-8 text-center">
                    <button
                        onClick={handleCalculate}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold text-xl px-12 py-4 rounded-lg shadow-lg transition-colors"
                    >
                        {loading ? "מחשב..." : "חשב"}
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <>
                        {/* Frequency Table */}
                        <div className="mb-6 bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
                            <h2 className="text-2xl font-bold text-blue-900 mb-4">
                                טבלת תדירות אותיות
                            </h2>
                            {result.totalLetters === 0 ? (
                                <p className="text-gray-600 text-center py-4">
                                    לא נמצאו אותיות בעברית בטקסט שהוזן.
                                </p>
                            ) : (
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-blue-100">
                                            {result.frequencies.map((freq) => (
                                                <th
                                                    key={freq.letter}
                                                    className="border border-blue-300 px-2 py-3 text-xl font-bold text-blue-900"
                                                >
                                                    {freq.letter}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {result.frequencies.map((freq) => (
                                                <td
                                                    key={freq.letter}
                                                    className="border border-blue-200 px-2 py-3 text-center text-lg font-semibold"
                                                >
                                                    {freq.count}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Copy Button */}
                        <div className="mb-6 text-center">
                            <button
                                onClick={copyResults}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors"
                            >
                                להעתיק את כל תוצאות החישוב
                            </button>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1: Total Letters */}
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    סך כל האותיות
                                </h3>
                                <p className="text-4xl font-bold text-gray-900">
                                    {result.totalLetters.toLocaleString("he-IL")}
                                </p>
                            </div>

                            {/* Card 2: Pashut */}
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    גימטריה פשוטה
                                </h3>
                                <p className="text-4xl font-bold text-gray-900">
                                    {result.sumPashut.toLocaleString("he-IL")}
                                </p>
                            </div>

                            {/* Card 3: Milui */}
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    גימטריית מילוי
                                </h3>
                                <p className="text-4xl font-bold text-gray-900">
                                    {result.sumMilui.toLocaleString("he-IL")}
                                </p>
                            </div>

                            {/* Card 4: Milui DeMilui */}
                            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    גימטריית מילוי דמילוי
                                </h3>
                                <p className="text-4xl font-bold text-gray-900">
                                    {result.sumMiluiDeMilui.toLocaleString("he-IL")}
                                </p>
                            </div>
                        </div>

                        {result.totalLetters === 0 && (
                            <div className="mt-6 text-center text-gray-600">
                                <p>לא נמצאו אותיות בעברית בטקסט שהוזן.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
