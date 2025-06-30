# Trabalho de Métodos Numéricos  
**Mateus Rodrigues Barreto - Matrícula: 241011466**

A aproximação por polinômios é uma técnica fundamental em métodos numéricos. Ela busca representar uma função complexa, f(x), por um polinômio P_M(x) de grau M, que é dado pela expressão:

P_M(x) = a₀ + a₁·x + a₂·x² + ... + a_M·x^M

O principal objetivo é encontrar os coeficientes aᵢ de forma que o polinômio P_M(x) seja o mais próximo possível da função f(x).

A proximidade entre f(x) e P_M(x) é quantificada por uma distância, definida como:

||f - P_M|| = raiz_quadrada da integral de (f - P_M)² de a até b

Para minimizar essa distância, usamos a função objetivo:

Q = ||f - P_M||² = integral de (f - P_M)² de a até b

No contexto discreto, isso se traduz em:

Q = soma de [yᵢ - (a₀ + a₁·xᵢ + ... + a_M·xᵢ^M)]²

Minimizar Q nos permite encontrar os coeficientes ideais para a aproximação.

Um exemplo prático dessa técnica é o **ajuste de reta**, um caso linear onde aproximamos f(x) por:

f(x) ≈ a₀·U₀ + a₁·U₁

O objetivo é minimizar:

soma de [yᵢ - a₀·U₀(xᵢ) - a₁·U₁(xᵢ)]²

Para encontrar os coeficientes a₀ e a₁, usamos o conceito de produto interno, o que nos leva ao seguinte sistema de equações:

⟨U₀, U₀⟩·a₀ + ⟨U₁, U₀⟩·a₁ = ⟨y, U₀⟩  
⟨U₀, U₁⟩·a₀ + ⟨U₁, U₁⟩·a₁ = ⟨y, U₁⟩

No ajuste de reta, os vetores de base são:

U₀ = (1, 1, ..., 1)  
U₁ = (x₀, x₁, ..., x_n)

Com esses vetores, o sistema linear para encontrar a₀ e a₁ é:

(N + 1)·a₀ + (soma de xᵢ)·a₁ = soma de yᵢ  
(soma de xᵢ)·a₀ + (soma de xᵢ²)·a₁ = soma de xᵢ·yᵢ

As soluções para a₀ e a₁ são dadas por:

a₁ = [(N + 1)·soma(xᵢ·yᵢ) - soma(xᵢ)·soma(yᵢ)]  
      dividido por [(N + 1)·soma(xᵢ²) - (soma(xᵢ))²]

a₀ = média de yᵢ - a₁ · média de xᵢ