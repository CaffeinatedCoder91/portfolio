import { describe, it, expect } from 'vitest';
import * as data from './data';
import type { TokenColor } from '@/lib/types';

const validTokenColors: TokenColor[] = ['ai', 'shu', 'mizu', 'fuji', 'matcha', 'kincha'];

const isValidTokenColor = (color: unknown): color is TokenColor => {
  return typeof color === 'string' && validTokenColors.includes(color as TokenColor);
};

describe('content/data', () => {
  describe('Projects', () => {
    it('has 6 projects', () => {
      expect(data.projects).toHaveLength(6);
    });

    it('every project has required fields', () => {
      data.projects.forEach((project) => {
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('category');
        expect(project).toHaveProperty('blurb');
        expect(project).toHaveProperty('tags');
        expect(project).toHaveProperty('points');

        expect(typeof project.title).toBe('string');
        expect(project.title.length).toBeGreaterThan(0);
        expect(typeof project.category).toBe('string');
        expect(project.category.length).toBeGreaterThan(0);
        expect(typeof project.blurb).toBe('string');
        expect(project.blurb.length).toBeGreaterThan(0);
        expect(Array.isArray(project.tags)).toBe(true);
        expect(project.tags.length).toBeGreaterThan(0);
        expect(Array.isArray(project.points)).toBe(true);
        expect(project.points.length).toBeGreaterThan(0);
      });
    });

    it('Flow project has live and code URLs', () => {
      const flow = data.projects.find((p) => p.title === 'Flow — AI-Powered Kanban');
      expect(flow).toBeDefined();
      expect(flow?.live).toBeDefined();
      expect(flow?.code).toBeDefined();
      expect(typeof flow?.live).toBe('string');
      expect(typeof flow?.code).toBe('string');
      expect(flow?.live?.startsWith('https://')).toBe(true);
      expect(flow?.code?.startsWith('https://')).toBe(true);
    });

    it('dataground is public AI project after Flow', () => {
      const dataground = data.projects[1];
      expect(dataground?.title).toBe('Dataground');
      expect(dataground?.category).toBe('AI');
      expect(dataground?.tags).toContain('Mapbox');
      expect(dataground?.tags).toContain('Geospatial');
      expect(dataground?.note).toBeUndefined();
      expect(dataground?.live).toBe('https://dataground-drab.vercel.app/');
      expect(dataground?.code).toBe('https://github.com/CaffeinatedCoder91/dataground');
    });

    it('vesper is a private AI project', () => {
      const vesper = data.projects.find((p) => p.title === 'Vesper');
      expect(vesper).toBeDefined();
      expect(vesper?.category).toBe('AI');
      expect(vesper?.note).toBe('Private build');
      expect(vesper?.live).toBeUndefined();
      expect(vesper?.code).toBeUndefined();
    });

    it('komorebi has note field and no live or code URLs', () => {
      const komorebi = data.projects.find((p) => p.title === 'Komorebi — Plant & Terrarium Shop');
      expect(komorebi).toBeDefined();
      expect(komorebi?.note).toBeDefined();
      expect(komorebi?.live).toBeUndefined();
      expect(komorebi?.code).toBeUndefined();
    });

    it('Frontend Engineer role has 5+ points', () => {
      const frontendRole = data.experience.find((r) => r.role === 'Frontend Engineer');
      expect(frontendRole).toBeDefined();
      expect(frontendRole?.points).toBeDefined();
      expect(Array.isArray(frontendRole?.points)).toBe(true);
      expect((frontendRole?.points ?? []).length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Experience', () => {
    it('Intern role has desc string instead of points', () => {
      const internRole = data.experience.find((r) => r.role === 'Intern Developer');
      expect(internRole).toBeDefined();
      expect(internRole?.desc).toBeDefined();
      expect(typeof internRole?.desc).toBe('string');
      expect((internRole?.desc ?? '').length).toBeGreaterThan(0);
      expect(internRole?.points).toBeUndefined();
    });

    it('every role has valid color', () => {
      data.experience.forEach((role) => {
        expect(isValidTokenColor(role.color)).toBe(true);
      });
    });
  });

  describe('Education', () => {
    it('has 3 education entries', () => {
      expect(data.education).toHaveLength(3);
    });

    it('includes BSc Biology', () => {
      const biology = data.education.find(
        (e) => e.role === 'BSc Biology'
      );
      expect(biology).toBeDefined();
    });

    it('every education entry has valid color', () => {
      data.education.forEach((edu) => {
        expect(isValidTokenColor(edu.color)).toBe(true);
      });
    });
  });

  describe('Colors', () => {
    it('all skill colors are valid TokenColor', () => {
      data.skills.forEach((skill) => {
        expect(isValidTokenColor(skill.color)).toBe(true);
      });
    });

    it('all contact item colors are valid TokenColor', () => {
      data.contact.items.forEach((item) => {
        expect(isValidTokenColor(item.color)).toBe(true);
      });
    });

    it('all experience colors are valid TokenColor', () => {
      data.experience.forEach((role) => {
        expect(isValidTokenColor(role.color)).toBe(true);
      });
    });

    it('all education colors are valid TokenColor', () => {
      data.education.forEach((edu) => {
        expect(isValidTokenColor(edu.color)).toBe(true);
      });
    });
  });

  describe('Contact', () => {
    it('has exactly 4 contact items', () => {
      expect(data.contact.items).toHaveLength(4);
    });

    it('email href starts with mailto:', () => {
      const email = data.contact.items.find((item) => item.kind === 'Email');
      expect(email).toBeDefined();
      expect(email?.href).toMatch(/^mailto:/);
    });

    it('phone href starts with tel:', () => {
      const phone = data.contact.items.find((item) => item.kind === 'Phone');
      expect(phone).toBeDefined();
      expect(phone?.href).toMatch(/^tel:/);
    });

    it('all contact items have required fields', () => {
      data.contact.items.forEach((item) => {
        expect(item).toHaveProperty('kind');
        expect(item).toHaveProperty('color');
        expect(item).toHaveProperty('glyph');
        expect(item).toHaveProperty('value');
        expect(item).toHaveProperty('href');
      });
    });
  });

  describe('Facts', () => {
    it('has facts array', () => {
      expect(Array.isArray(data.facts)).toBe(true);
      expect(data.facts.length).toBeGreaterThan(0);
    });

    it('each fact has num and label', () => {
      data.facts.forEach((fact) => {
        expect(fact).toHaveProperty('num');
        expect(fact).toHaveProperty('label');
        expect(typeof fact.num).toBe('string');
        expect(typeof fact.label).toBe('string');
      });
    });
  });

  describe('Skills', () => {
    it('has skills array', () => {
      expect(Array.isArray(data.skills)).toBe(true);
      expect(data.skills.length).toBeGreaterThan(0);
    });

    it('each skill has name, color and items', () => {
      data.skills.forEach((skill) => {
        expect(skill).toHaveProperty('name');
        expect(skill).toHaveProperty('color');
        expect(skill).toHaveProperty('items');
        expect(typeof skill.name).toBe('string');
        expect(Array.isArray(skill.items)).toBe(true);
        expect(skill.items.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Metadata', () => {
    it('has name string', () => {
      expect(typeof data.name).toBe('string');
      expect(data.name.length).toBeGreaterThan(0);
    });

    it('has short name string', () => {
      expect(typeof data.short).toBe('string');
      expect(data.short.length).toBeGreaterThan(0);
    });

    it('has location string', () => {
      expect(typeof data.location).toBe('string');
      expect(data.location.length).toBeGreaterThan(0);
    });

    it('has timezone string', () => {
      expect(typeof data.timezone).toBe('string');
      expect(data.timezone.length).toBeGreaterThan(0);
    });

    it('has role string', () => {
      expect(typeof data.role).toBe('string');
      expect(data.role.length).toBeGreaterThan(0);
    });

    it('has tagline string', () => {
      expect(typeof data.tagline).toBe('string');
      expect(data.tagline.length).toBeGreaterThan(0);
    });

    it('has about array', () => {
      expect(Array.isArray(data.about)).toBe(true);
      expect(data.about.length).toBeGreaterThan(0);
      data.about.forEach((para) => {
        expect(typeof para).toBe('string');
        expect(para.length).toBeGreaterThan(0);
      });
    });

    it('has contact head and sub', () => {
      expect(typeof data.contact.head).toBe('string');
      expect(data.contact.head.length).toBeGreaterThan(0);
      expect(typeof data.contact.sub).toBe('string');
      expect(data.contact.sub.length).toBeGreaterThan(0);
    });
  });
});
