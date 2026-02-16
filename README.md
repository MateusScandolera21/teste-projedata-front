# React + Vite

Este template fornece uma configuração mínima para fazer o React funcionar com Vite, incluindo HMR (Hot Module Replacement) e algumas regras de ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

@vitejs/plugin-react

Utiliza Babel (ou oxc, quando usado com rolldown-vite) para Fast Refresh.

@vitejs/plugin-react-swc

Utiliza SWC para Fast Refresh.

## React Compiler

O React Compiler não está habilitado neste template devido ao impacto no desempenho durante o desenvolvimento e build.

Para adicioná-lo ao projeto, consulte a documentação oficial:
https://react.dev/learn/react-compiler/installation

## Expandindo a configuração do ESLint

Se você estiver desenvolvendo uma aplicação para produção, recomendamos utilizar TypeScript com regras de lint baseadas em tipos (type-aware lint rules).

Confira o template oficial com TypeScript para saber como integrar TypeScript e typescript-eslint ao seu projeto:

https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts
