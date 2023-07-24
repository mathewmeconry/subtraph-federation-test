import { dataSource } from "@graphprotocol/graph-ts";
import { Proposal } from "../generated/schema";
import { ProposalCreated } from "../generated/templates/Multisig/Multisig";

export function handleProposalCreated(event: ProposalCreated): void {
  let context = dataSource.context();
  const proposal = new Proposal(event.params.proposalId.toHexString());
  proposal.dao = context.getString("dao");
  proposal.creator = event.transaction.from;
  proposal.save();
}
