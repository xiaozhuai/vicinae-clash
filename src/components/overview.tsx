import { Action, ActionPanel, Color, Icon, List } from "@vicinae/api";
import { prettyBytes } from "../lib/format";
import { useWebSocketJson } from "../lib/use-websocket";
import type { Connections, Traffic } from "../types";

const EMPTY_TRAFFIC: Traffic = { up: 0, down: 0 };
const EMPTY_CONNECTIONS: Connections = { uploadTotal: 0, downloadTotal: 0, connections: [] };

export default function Overview() {
  const traffic = useWebSocketJson<Traffic>("/traffic");
  const connections = useWebSocketJson<Connections>("/connections");
  const trafficData = traffic.data ?? EMPTY_TRAFFIC;
  const connectionData = connections.data ?? EMPTY_CONNECTIONS;
  const error = traffic.error ?? connections.error;

  return (
    <List isLoading={(traffic.isConnecting || connections.isConnecting) && !traffic.data && !connections.data}>
      {error ? (
        <List.Item
          icon={{ source: Icon.Exclamationmark, tintColor: Color.Red }}
          title="Live Data Unavailable"
          subtitle={error}
        />
      ) : null}
      <List.Section title="Current Traffic">
        <List.Item
          icon={{ source: Icon.ArrowUp, tintColor: Color.Orange }}
          title="Upload"
          accessories={[{ text: `${prettyBytes(trafficData.up)}/s` }]}
        />
        <List.Item
          icon={{ source: Icon.ArrowDown, tintColor: Color.Blue }}
          title="Download"
          accessories={[{ text: `${prettyBytes(trafficData.down)}/s` }]}
        />
      </List.Section>
      <List.Section title="Session">
        <List.Item
          icon={Icon.Upload}
          title="Uploaded"
          accessories={[{ text: prettyBytes(connectionData.uploadTotal) }]}
        />
        <List.Item
          icon={Icon.Download}
          title="Downloaded"
          accessories={[{ text: prettyBytes(connectionData.downloadTotal) }]}
        />
        <List.Item
          icon={Icon.FullSignal}
          title="Active Connections"
          accessories={[{ text: String(connectionData.connections.length) }]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                title="Copy Connection Count"
                content={String(connectionData.connections.length)}
              />
            </ActionPanel>
          }
        />
      </List.Section>
    </List>
  );
}
