class Api::V1::TicketsController < ApplicationController
  before_action :set_ticket, only: %i[show update]

  def index
    ticket = Ticket.all.order(created_at: :desc)
    render json: ticket
  end

  def create
    ticket = Ticket.new(ticket_params)
    if ticket.save
      render json: ticket
    else
      render json: ticket.errors
    end
  end

  def show
    render json: @ticket
  end

  def update
    if @ticket.update(ticket_params)
      render json: { message: 'Ticket Resolved!' }
    else
      render json: { message: 'Update failed!' }
    end
  end

  private

  def ticket_params
    params.permit(:name, :email, :description, :response, :resolved, :status)
  end

  def set_ticket
    @ticket = Ticket.find(params[:id])
  end
end
