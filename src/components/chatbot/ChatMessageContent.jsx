import { Box, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

/**
 * Render inline markdown (**bold**, *italic*, `code`) safely as React nodes (no HTML injection).
 */
function renderInline(text, keyPrefix = "inl") {
  if (!text) return null;
  const tokens = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
  let lastIndex = 0;
  let match;
  let idx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    const key = `${keyPrefix}-${idx++}`;
    if (token.startsWith("**") && token.endsWith("**")) {
      tokens.push(
        <Box component="strong" key={key} sx={{ fontWeight: 700, color: "#0f172a" }}>
          {token.slice(2, -2)}
        </Box>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      tokens.push(
        <Box
          component="code"
          key={key}
          sx={{
            px: 0.7,
            py: 0.15,
            mx: 0.2,
            borderRadius: 1,
            bgcolor: "#f1f5f9",
            color: "#1e293b",
            fontSize: "0.78rem",
            fontFamily: "monospace",
            border: "1px solid #e2e8f0",
          }}
        >
          {token.slice(1, -1)}
        </Box>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      tokens.push(
        <Box component="em" key={key} sx={{ fontStyle: "italic", color: "#334155" }}>
          {token.slice(1, -1)}
        </Box>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }
  return tokens;
}

/**
 * Split a bullet line into optional Key / Value highlight if it follows "**Label:** details" or "Label: details".
 */
function renderBulletBody(rawContent, keyPrefix) {
  const kvMatch = rawContent.match(/^\*\*([^*]+?):\*\*\s*(.*)$/) || rawContent.match(/^([A-Za-z0-9\s/&()'-]{2,42}):\s+(.+)$/);
  if (kvMatch) {
    const label = kvMatch[1].replace(/:\s*$/, "").trim();
    const rest = kvMatch[2].trim();
    return (
      <Typography variant="body2" sx={{ color: "#334155", fontSize: "0.84rem", lineHeight: 1.55 }}>
        <Box component="span" sx={{ fontWeight: 700, color: "#0f172a" }}>
          {label}:
        </Box>{" "}
        {renderInline(rest, keyPrefix)}
      </Typography>
    );
  }
  return (
    <Typography variant="body2" sx={{ color: "#334155", fontSize: "0.84rem", lineHeight: 1.55 }}>
      {renderInline(rawContent, keyPrefix)}
    </Typography>
  );
}

function parseTableBlock(lines, startIdx) {
  const rows = [];
  let i = startIdx;
  while (i < lines.length && lines[i].trim().startsWith("|")) {
    const row = lines[i]
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
    rows.push(row);
    i++;
  }
  if (rows.length < 2) return { block: null, nextIdx: startIdx + 1 };

  const isSeparator = rows[1].every((cell) => /^:?-{2,}:?$/.test(cell));
  const headers = rows[0];
  const bodyRows = isSeparator ? rows.slice(2) : rows.slice(1);
  return {
    block: { type: "table", headers, bodyRows },
    nextIdx: i,
  };
}

export default function ChatMessageContent({ text }) {
  if (!text) return null;
  const lines = String(text).replace(/\r\n/g, "\n").split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      elements.push(<Divider key={`hr-${i}`} sx={{ my: 1.2, borderColor: "#e2e8f0" }} />);
      i++;
      continue;
    }

    // Markdown Heading (#, ##, ###, ####)
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].replace(/\*\*/g, "").trim();
      elements.push(
        <Box
          key={`h-${i}`}
          sx={{
            mt: elements.length === 0 ? 0.2 : 1.4,
            mb: 0.7,
            pl: 1.2,
            py: 0.35,
            borderLeft: "3px solid #3244e6",
            bgcolor: level <= 3 ? "#f8faff" : "transparent",
            borderRadius: "0 6px 6px 0",
          }}
        >
          <Typography
            variant={level <= 2 ? "subtitle1" : "subtitle2"}
            sx={{
              fontWeight: 700,
              color: "#0f172a",
              fontSize: level <= 2 ? "0.94rem" : "0.87rem",
              lineHeight: 1.35,
            }}
          >
            {headingText}
          </Typography>
        </Box>
      );
      i++;
      continue;
    }

    // Markdown Table
    if (trimmed.startsWith("|")) {
      const { block, nextIdx } = parseTableBlock(lines, i);
      if (block) {
        elements.push(
          <TableContainer
            key={`tbl-${i}`}
            component={Paper}
            elevation={0}
            sx={{ my: 1.2, border: "1px solid #e2e8f0", borderRadius: 2, overflowX: "auto" }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                <TableRow>
                  {block.headers.map((h, hIdx) => (
                    <TableCell key={hIdx} sx={{ fontWeight: 700, fontSize: "0.76rem", color: "#0f172a", py: 0.8 }}>
                      {renderInline(h, `th-${i}-${hIdx}`)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {block.bodyRows.map((row, rIdx) => (
                  <TableRow key={rIdx} hover>
                    {row.map((cell, cIdx) => (
                      <TableCell key={cIdx} sx={{ fontSize: "0.76rem", color: "#334155", py: 0.75 }}>
                        {renderInline(cell, `td-${i}-${rIdx}-${cIdx}`)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
        i = nextIdx;
        continue;
      }
    }

    // Bullet List Group (*, -, •)
    if (/^[-*•]\s+/.test(trimmed)) {
      const listItems = [];
      while (i < lines.length) {
        const curRaw = lines[i];
        const curTrim = curRaw.trim();
        const bulletMatch = curTrim.match(/^[-*•]\s+(.*)$/);
        if (!bulletMatch) break;
        const isNested = /^\s{2,}/.test(curRaw);
        listItems.push({ text: bulletMatch[1].trim(), isNested, lineIdx: i });
        i++;
      }

      elements.push(
        <Stack
          key={`ul-${i}`}
          spacing={0.7}
          sx={{
            my: 0.8,
            p: 1.1,
            borderRadius: 2,
            bgcolor: "#f8fafc",
            border: "1px solid #eef2f6",
          }}
        >
          {listItems.map((item) => (
            <Stack
              key={`li-${item.lineIdx}`}
              direction="row"
              spacing={1}
              alignItems="flex-start"
              sx={{ pl: item.isNested ? 2 : 0 }}
            >
              <Box
                sx={{
                  width: item.isNested ? 5 : 6,
                  height: item.isNested ? 5 : 6,
                  borderRadius: "50%",
                  bgcolor: item.isNested ? "#10b981" : "#3244e6",
                  mt: "7px",
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {renderBulletBody(item.text, `li-${item.lineIdx}`)}
              </Box>
            </Stack>
          ))}
        </Stack>
      );
      continue;
    }

    // Numbered List Group (1., 2., etc.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const orderedItems = [];
      while (i < lines.length) {
        const curTrim = lines[i].trim();
        const numMatch = curTrim.match(/^(\d+)\.\s+(.*)$/);
        if (!numMatch) break;
        orderedItems.push({ num: numMatch[1], text: numMatch[2].trim(), lineIdx: i });
        i++;
      }

      elements.push(
        <Stack key={`ol-${i}`} spacing={0.8} sx={{ my: 0.8 }}>
          {orderedItems.map((item) => (
            <Stack
              key={`oli-${item.lineIdx}`}
              direction="row"
              spacing={1.1}
              alignItems="flex-start"
              sx={{
                p: 0.9,
                borderRadius: 2,
                bgcolor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: "#eef2ff",
                  color: "#3244e6",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  mt: 0.1,
                }}
              >
                {item.num}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {renderBulletBody(item.text, `oli-${item.lineIdx}`)}
              </Box>
            </Stack>
          ))}
        </Stack>
      );
      continue;
    }

    // Standard Paragraph
    elements.push(
      <Typography
        key={`p-${i}`}
        variant="body2"
        sx={{
          color: "#1e293b",
          fontSize: "0.855rem",
          lineHeight: 1.6,
          mb: 0.8,
          "&:last-child": { mb: 0 },
        }}
      >
        {renderInline(trimmed, `p-${i}`)}
      </Typography>
    );
    i++;
  }

  return <Box sx={{ "& > *:last-child": { mb: 0 } }}>{elements}</Box>;
}

