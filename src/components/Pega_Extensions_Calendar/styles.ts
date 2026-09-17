import styled, { css } from 'styled-components';

export const CalendarSurface = styled.div(({ theme }) => {
  return css`
    --calendar-accent: ${theme.base.palette['brand-primary']};
    --calendar-border: ${theme.base.palette['border-line']};
    --calendar-surface: ${theme.base.palette['background-color']};

    position: relative;
    overflow: hidden;
    border: 0.0625rem solid var(--calendar-border);
    border-radius: 0.75rem;
    background: var(--calendar-surface);

    .fc {
      --fc-border-color: var(--calendar-border);
      --fc-button-bg-color: transparent;
      --fc-button-border-color: transparent;
      --fc-button-text-color: inherit;
      --fc-button-hover-bg-color: color-mix(in srgb, var(--calendar-accent) 10%, transparent);
      --fc-button-hover-border-color: transparent;
      --fc-button-active-bg-color: var(--calendar-accent);
      --fc-button-active-border-color: var(--calendar-accent);
      --fc-today-bg-color: color-mix(in srgb, var(--calendar-accent) 8%, transparent);
      --fc-page-bg-color: transparent;
      padding: 0.5rem;
    }

    .fc .fc-toolbar {
      gap: 0.75rem;
      padding: 0.5rem 0.5rem 1rem;
    }

    .fc .fc-toolbar-title {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 0;
    }

    .fc .fc-button {
      background: color-mix(in srgb, var(--calendar-accent) 7%, var(--calendar-surface));
      border: 0.0625rem solid color-mix(in srgb, var(--calendar-accent) 24%, var(--calendar-border));
      color: inherit;
      border-radius: 0.5rem;
      transition:
        background-color 160ms ease,
        color 160ms ease,
        transform 160ms ease,
        box-shadow 160ms ease;
    }

    .fc .fc-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 0.25rem 0.75rem color-mix(in srgb, var(--calendar-accent) 18%, transparent);
    }

    .fc .fc-button.fc-button-active,
    .fc .fc-button:active {
      color: white;
    }

    .fc .fc-button:active {
      transform: translateY(0);
    }

    .fc .fc-daygrid-day,
    .fc .fc-timegrid-col {
      transition: background-color 180ms ease;
    }

    .fc .fc-daygrid-day:hover,
    .fc .fc-timegrid-col:hover {
      background: color-mix(in srgb, var(--calendar-accent) 3%, transparent);
    }

    .fc .fc-day-today .fc-daygrid-day-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.75rem;
      height: 1.75rem;
      margin: 0.25rem;
      border-radius: 999px;
      background: var(--calendar-accent);
      color: white;
      font-weight: 700;
    }

    .fc .fc-event {
      position: relative;
      overflow: hidden;
      border: 0;
      border-radius: 0.5rem;
      box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.12);
      transition:
        transform 180ms ease,
        box-shadow 180ms ease,
        filter 180ms ease;
      animation: calendar-event-enter 320ms ease both;
    }

    .fc .fc-event::after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -75%;
      width: 42%;
      content: '';
      background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.34), transparent);
      pointer-events: none;
      transform: skewX(-18deg);
      transition: left 420ms ease;
    }

    .fc .fc-event:hover {
      z-index: 5;
      filter: saturate(1.08);
      transform: translateY(-0.2rem) scale(1.01);
      box-shadow: 0 0.65rem 1.25rem rgba(0, 0, 0, 0.2);
    }

    .fc .fc-event:hover::after {
      left: 130%;
    }

    @keyframes calendar-event-enter {
      from {
        opacity: 0;
        transform: translateY(0.3rem);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .fc .fc-button,
      .fc .fc-event,
      .fc .fc-daygrid-day,
      .fc .fc-timegrid-col {
        animation: none;
        transition: none;
      }
    }
  `;
});

export default styled.div(({ theme }) => {
  return css`
    border: 0.0625rem solid ${theme.base.palette['border-line']};
    padding: 0.25rem;
    width: 100%;
    overflow: hidden;
    white-space: normal;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;

    &:hover {
      transform: translateY(-0.1rem);
      box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.16);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  `;
});
