defmodule BlockScoutWeb.ContractVerifyPage do
  @moduledoc false

  use Wallaby.DSL

  import Wallaby.Query

  def visit_page(session, address_hash) do
    visit(session, "/en/address/#{address_hash}/contract_verifications/new")
  end

  def fill_form(session, %{
        contract_name: contract_name,
        version: version,
        optimization: optimization,
        source_code: source_code
      }) do
    session
    |> fill_in(css("[data-test='contract_name']"), with: contract_name)
    |> fill_in(text_field("Enter the Solidity Contract Code below"), with: source_code)

    case version do
      nil -> nil
      _ -> click(session, option(version))
    end

    case optimization do
      true ->
        click(session, radio_button("Yes"))

      false ->
        click(session, radio_button("No"))

      _ ->
        nil
    end

    session
  end

  def validation_error do
    css(
      "[data-test='contract-source-code-error']",
      text: "there was an error validating your contract, please try again."
    )
  end

  def verify_and_publish(session) do
    click(session, button("Verify and publish"))
  end
end
