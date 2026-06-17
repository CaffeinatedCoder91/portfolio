import React from 'react';
import { Glyph } from './Hero.styles';

const GlyphMarks = () => {
  return (
    <>
      <Glyph
        $left="3%"
        $top="12%"
        $rotation={-8}
        $size="heroGlyphLarge"
        $color="ai"
        $opacity={0.1}
      >
        {'{ }'}
      </Glyph>

      <Glyph
        $left="6%"
        $top="62%"
        $rotation={6}
        $size="heroGlyphMedium"
        $color="fuji"
        $opacity={0.1}
      >
        &lt;/&gt;
      </Glyph>

      <Glyph
        $left="38%"
        $top="8%"
        $rotation={5}
        $size="heroGlyphSmall"
        $color="kincha"
        $opacity={0.1}
      >
        =&gt;
      </Glyph>

      <Glyph
        $left="2%"
        $top="78%"
        $rotation={10}
        $size="heroGlyphSlash"
        $color="mizu"
        $opacity={0.1}
      >
        {'//'}
      </Glyph>

      <Glyph
        $left="44%"
        $top="76%"
        $rotation={-4}
        $size="heroGlyphSmall"
        $color="shu"
        $opacity={0.09}
      >
        AI
      </Glyph>

      <Glyph
        $right="4%"
        $top="78%"
        $rotation={-6}
        $size="heroGlyphBracket"
        $color="matcha"
        $opacity={0.1}
      >
        {'[ ]'}
      </Glyph>
    </>
  );
};

export default GlyphMarks;
