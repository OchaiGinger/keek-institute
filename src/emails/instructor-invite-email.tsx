import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface InstructorInviteEmailProps {
  inviteUrl: string;
  expiresInHours?: number;
}

export function InstructorInviteEmail({
  inviteUrl,
  expiresInHours = 48,
}: InstructorInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        You've been invited to join Keek Institute as an Instructor
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerText}>Keek Institute</Heading>
          </Section>

          {/* Body */}
          <Section style={body}>
            <Heading as="h2" style={heading}>
              You're invited to teach 👋
            </Heading>

            <Text style={paragraph}>Hello,</Text>

            <Text style={paragraph}>
              The admin team at <strong>Keek Institute</strong> has invited you
              to join as an <strong>Instructor</strong>. We're excited to have
              you on board.
            </Text>

            <Text style={paragraph}>
              Click the button below to create your account and get started.
              This invitation link will expire in{" "}
              <strong>{expiresInHours} hours</strong>.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={inviteUrl}>
                Accept Invitation
              </Button>
            </Section>

            {/* Fallback URL */}
            <Section style={urlBox}>
              <Text style={urlLabel}>Or copy this link into your browser:</Text>
              <Text style={urlText}>{inviteUrl}</Text>
            </Section>

            <Hr style={hr} />

            <Text style={footerNote}>
              If you weren't expecting this invitation or believe this was sent
              in error, you can safely ignore this email — no account will be
              created.
            </Text>

            <Text style={footerNote}>— The Keek Institute Team</Text>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerSmall}>
              © {new Date().getFullYear()} Keek Institute. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default InstructorInviteEmail;

// ─── Styles ──────────────────────────────────────────────────────────────────

const main: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  margin: "40px auto",
  maxWidth: "560px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const header: React.CSSProperties = {
  backgroundColor: "#18181b",
  padding: "24px 32px",
};

const headerText: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0",
};

const body: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "32px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#18181b",
  margin: "0 0 20px",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#3f3f46",
  margin: "0 0 16px",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "28px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#ea580c",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  padding: "12px 28px",
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-block",
};

const urlBox: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e4e4e7",
  borderRadius: "6px",
  padding: "12px 16px",
  margin: "0 0 24px",
};

const urlLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#71717a",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: "0 0 6px",
};

const urlText: React.CSSProperties = {
  fontSize: "12px",
  color: "#3f3f46",
  fontFamily: "monospace",
  wordBreak: "break-all",
  margin: "0",
};

const hr: React.CSSProperties = {
  borderColor: "#e4e4e7",
  margin: "24px 0",
};

const footerNote: React.CSSProperties = {
  fontSize: "13px",
  color: "#71717a",
  margin: "0 0 8px",
};

const footerSection: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  padding: "16px 32px",
  borderTop: "1px solid #e4e4e7",
  textAlign: "center",
};

const footerSmall: React.CSSProperties = {
  fontSize: "11px",
  color: "#a1a1aa",
  margin: "0",
};
