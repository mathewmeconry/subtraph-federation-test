import { InstallationApplied } from "../generated/PSP/PluginSetupProcessor";
import { ethereum, Bytes, DataSourceContext } from "@graphprotocol/graph-ts";
import { Multisig } from "../generated/templates";
import { ERC165 } from "../generated/PSP/ERC165";

export function handleInstallationApplied(event: InstallationApplied): void {
  if (event.params.plugin) {
    const contract = ERC165.bind(event.params.plugin);
    let result = ethereum.call(
      new ethereum.SmartContractCall(
        contract._name, // '',
        contract._address, // address,
        "supportsInterface", // '',
        "supportsInterface(bytes4):(bool)",
        [
          ethereum.Value.fromFixedBytes(
            Bytes.fromHexString("0x8f852786") as Bytes
          ),
        ]
      )
    );

    if (
      result == null ||
      (result as Array<ethereum.Value>)[0].toBoolean() == false
    ) {
      return;
    }

    const context = new DataSourceContext();
    context.setString("dao", event.params.dao.toHexString());
    Multisig.createWithContext(event.params.plugin, context);
  }
}
