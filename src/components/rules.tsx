import { Action, ActionPanel, Icon, List } from "@vicinae/api";
import { useCallback, useEffect, useState } from "react";
import { getRules } from "../lib/clash-api";
import { showError } from "../lib/toast";
import type { Rule } from "../types";

export default function Rules() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      setRules(await getRules());
    } catch (error) {
      await showError("Could Not Load Rules", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => void load(), [load]);

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search all rules...">
      {rules.map((rule, index) => {
        const title = rule.payload || rule.type;
        return (
          <List.Item
            key={`${rule.type}-${rule.payload}-${index}`}
            icon={Icon.Shield01}
            title={title}
            subtitle={rule.payload ? rule.type : undefined}
            keywords={[rule.type, rule.proxy, rule.payload]}
            accessories={[{ tag: rule.proxy }]}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard
                  title="Copy Rule"
                  icon={Icon.CopyClipboard}
                  content={[rule.type, rule.payload, rule.proxy].filter(Boolean).join(",")}
                />
                <Action title="Refresh" icon={Icon.ArrowClockwise} onAction={() => void load()} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
